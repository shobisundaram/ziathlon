import { Injectable } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagestateService {
  private filterState: { [key: string]: string } = {};
  private readonly currentPageSubject = new BehaviorSubject<number>(1);
  currentPage$: Observable<number> = this.currentPageSubject.asObservable();
  // private dataSource: ServerDataSource | null = null;

  private readonly clearFilter = new BehaviorSubject<boolean>(false);
  clearFilter$ = this.clearFilter.asObservable();

  private readonly textFiltersSource = new BehaviorSubject<any>(null);
  private readonly dateFiltersSource = new BehaviorSubject<any>(null);
  private readonly statusFiltersSource = new BehaviorSubject<any>(null);

  textFilters$ = this.textFiltersSource.asObservable();
  dateFilters$ = this.dateFiltersSource.asObservable();
  statusFilters$ = this.statusFiltersSource.asObservable();

  constructor(private readonly router: Router, private readonly ActivatedRoute: ActivatedRoute) { }

  // get serverSource(): ServerDataSource {
  //     return this.dataSource;
  // }

  // set serverSource(source: ServerDataSource) {
  //     this.dataSource = source
  // }

  setPage(pageNum: number): void {
    this.currentPageSubject.next(pageNum);
  }

  getPage(): number {
    return this.currentPageSubject.getValue();
  }

  refreshTableSource(): void {
    // if (this.dataSource) {
    //     this.dataSource.refresh();
    // }
  }

  handlePageChange(change: any, activatedRoute: any): void {
    console.log(change, "changes happens");

    const pageNum = change.paging.page;
    this.setPage(pageNum);
    if (change.action === "page") {
      const navigationExtras: NavigationExtras = {
        queryParams: { ...activatedRoute.snapshot.queryParams, page: pageNum },
        queryParamsHandling: "merge",
      };
      this.router.navigate([], navigationExtras);

    } else if (change.action === "filter") {
      if (change.filter.filters.length) {
        let filter = JSON.stringify(change.filter.filters);
        const navigationExtras: NavigationExtras = {
          queryParams: {
            ...this.ActivatedRoute.snapshot.queryParams,
            page: pageNum,
            filter: filter,
          },
          queryParamsHandling: "merge",
        };
        this.router.navigate([], navigationExtras);
      } else {
        const navigationExtras: NavigationExtras = {
          queryParams: {
            page: pageNum,
          },
        };
        this.router.navigate([], navigationExtras);
        this.clearFilter.next(true)
      }
    }
  }
  setFilterState(filters: { [key: string]: string }): void {
    this.filterState = filters;
  }

  getFilterState(): { [key: string]: string } {
    return this.filterState;
  }
  handlePaginationChange(pageNum: number): void {
    this.setPage(pageNum);
    const navigationExtras: NavigationExtras = {
      queryParams: { ...this.ActivatedRoute.snapshot.queryParams, page: pageNum },
      queryParamsHandling: 'merge',
    };
    this.router.navigate([], navigationExtras);
  }

  handlePagination(pageNum, page, first): void {
    if (pageNum == page) {
      console.log("same page number");
    } else {
      pageNum = page;
      // first = (pageNum * 10) - 1;
      console.log(pageNum, "page numberrrrr");

      console.log("page changed");
      this.router.navigate([], {
        relativeTo: this.ActivatedRoute,
        queryParams: { page: pageNum },
        queryParamsHandling: 'merge'
      });
    }


  }
  // }




  // handleFilterChange(filters: { [key: string]: any }): void {
  //     this.setFilterState(filters);
  //     const navigationExtras: NavigationExtras = {
  //         queryParams: {
  //             ...this.ActivatedRoute.snapshot.queryParams,
  //             filter: JSON.stringify(filters),
  //         },
  //         // queryParamsHandling: 'merge',
  //     };
  //     this.router.navigate([], navigationExtras);
  // }

  // handleFilterChange(filters: { [key: string]: any }): void {
  //   console.log(filters)
  //   this.setFilterState(filters);
  //   const navigationExtras: NavigationExtras = {
  //     queryParams: {
  //       ...this.ActivatedRoute.snapshot.queryParams,
  //     },
  //     queryParamsHandling: 'merge',
  //   };
  //   if (Object.keys(filters).length > 0) {
  //     navigationExtras.queryParams['filter'] = JSON.stringify(filters);
  //   } else {
  //     delete navigationExtras.queryParams['filter'];
  //   }
  //   this.router.navigate([], navigationExtras);
  // }
  handleFilterChange(filters: { [key: string]: any }): void {
    console.log(filters)
    this.setFilterState(filters);
    for (let key in filters) {
      if (filters[key] === '' || filters[key] === undefined || filters[key] === null) {
        delete filters[key];
      }
    }
    // const currentFilters = this.ActivatedRoute.snapshot.queryParams['filter']
    //      ? JSON.parse(this.ActivatedRoute.snapshot.queryParams['filter'])
    //      : {};

    // const updatedFilters = { ...currentFilters, ...filters };

    const navigationExtras: NavigationExtras = {
      queryParams: {
        ...this.ActivatedRoute.snapshot.queryParams,
        filter: JSON.stringify(filters),
      },
    };

    if (Object.keys(filters).length === 0) {
      delete navigationExtras.queryParams['filter'];
    }

    this.router.navigate([], navigationExtras);
  }


  clearFilters(): void {
    this.filterState = {}
    this.clearFilter.next(true);
    this.textFiltersSource.next({});
    this.dateFiltersSource.next({});
    this.statusFiltersSource.next({});
    const navigationExtras: NavigationExtras = {
      queryParams: {
        ...this.ActivatedRoute.snapshot.queryParams,
        filter: null,
      },
      queryParamsHandling: 'merge',
    };
    this.router.navigate([], navigationExtras);
  }

}
