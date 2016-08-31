define('app',["require", "exports"], function (require, exports) {
    "use strict";
    var App = (function () {
        function App() {
        }
        App.prototype.configureRouter = function (config, router) {
            this.router = router;
            config.title = 'Aurelia';
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
            this.router.addRoute({
                route: "/AppCaseMgmt/CaseList/AddRoute/:RefNo", name: "CaseListAddRoute", moduleId: "case-management/case-list",
                title: "Test"
            });
            console.log("router configured");
        };
        App.prototype.click = function (routeName) {
            window.open(this.router.generate(routeName, { RefNo: this.getRefNo() }), '_blank');
        };
        App.prototype.local = function () {
            this.router.navigateToRoute('CaseListMap', { RefNo: this.getRefNo() }, { replace: true });
        };
        App.prototype.getRefNo = function () {
            return Math.floor((Math.random() * 100) + 1);
        };
        return App;
    }());
    exports.App = App;
});

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

define('home',["require", "exports"], function (require, exports) {
    "use strict";
    var Home = (function () {
        function Home() {
            this.message = 'Homepage';
        }
        return Home;
    }());
    exports.Home = Home;
});

define('main',["require", "exports", './environment'], function (require, exports, environment_1) {
    "use strict";
    Promise.config({
        warnings: {
            wForgottenReturn: false
        }
    });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources');
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});

define('case-management/case-list',["require", "exports"], function (require, exports) {
    "use strict";
    var CaseList = (function () {
        function CaseList() {
            this.message = 'CaseList with parameter';
            this.refNo = 'empty';
        }
        CaseList.prototype.activate = function (params) {
            this.refNo = params.RefNo || 'empty';
            console.log("activated: case-list");
        };
        return CaseList;
    }());
    exports.CaseList = CaseList;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(config) {
    }
    exports.configure = configure;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <router-view></router-view>\n\n  <div>\n    <button click.delegate=\"local()\">Current tab - navigateToRoute</button> or\n    <button click.delegate=\"click('CaseListMap')\">New tab - config.map()</button> or\n    <button click.delegate=\"click('CaseListAddRoute')\">New tab - router.addRoute()</button>\n  </div>\n</template>"; });
define('text!home.html', ['module'], function(module) { module.exports = "<template>\n\n\t<h1>${message}</h1>\n\n\t<!-- Invoke case-list viewmodel without RefNo -->\n\n\t<require from=\"./case-management/case-list\"></require>\n\n\t<case-list></case-list>\n\n</template>"; });
define('text!case-management/case-list.html', ['module'], function(module) { module.exports = "<template>\n  <h1>${message}</h1>\n  <h2><strong>RefNo.:</strong> ${refNo}</h2>\n  <hr/>\n</template>"; });
//# sourceMappingURL=app-bundle.js.map