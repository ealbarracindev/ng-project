import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, PRIMARY_OUTLET } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Breadcrumb } from './breadcrumb';

@Component({
  selector: 'sc-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbs:Breadcrumb[]=[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() { this.loadData();}

  private loadData(){
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(map((route) => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      }))
      .pipe(filter(route => route.outlet === PRIMARY_OUTLET))
      .subscribe(route => {

        let snapshot = this.router.routerState.snapshot;
        this.breadcrumbs = [];
        let url = snapshot.url;
        let routeData = route.snapshot.data;

        //console.log(routeData);
        let label = routeData['breadcrumb'];
        let params = snapshot.root.params;

        this.breadcrumbs.push({
          url: url,
          label: label,
          params: params
        });

      });
  }
}