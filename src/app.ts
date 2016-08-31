export class App {
  router: any;

  configureRouter(config, router) {
    this.router = router;

    config.title = 'Aurelia';

    // parameterized route added by map
    config.map([
      {
        route: ['', 'home'], name: 'home',
        moduleId: './home', nav: true, title: 'Home'
      },
      {
        route: "/AppCaseMgmt/CaseList/Map/:RefNo", name: "CaseListMap", moduleId: "case-management/case-list",
        title: "Test"
      }
    ]);

    // parameterized route added by addRoute
    this.router.addRoute({
      route: "/AppCaseMgmt/CaseList/AddRoute/:RefNo", name: "CaseListAddRoute", moduleId: "case-management/case-list",
      title: "Test"
    });

    console.log("router configured");
  }

  // open in new window
  click(routeName) {
    window.open(this.router.generate(routeName, { RefNo: this.getRefNo() }), '_blank');
  }

  // navigate locally
  local() {

    this.router.navigateToRoute('CaseListMap', { RefNo: this.getRefNo() }, { replace: true });
  }

  // get a random number
  getRefNo() {
    return Math.floor((Math.random() * 100) + 1);
  }
}
