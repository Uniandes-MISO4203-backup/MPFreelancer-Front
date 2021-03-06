(function (ng) {
    var mod = ng.module('projectSponsorModule');

    mod.controller('projectSponsorCtrl', ['CrudCreator', '$scope',
        'projectSponsorContext', 'projectSponsorModel',
        function (ngCrud, $scope, url, model) {
            ngCrud.extendController({
                name: 'projectSponsor',
                displayName: 'Project Sponsor',
                ctrl: this,
                scope: $scope,
                model: model,
                url: url
            });
            this.fetchRecords();
            this.globalActions.create = {
                show: function () {
                    return false;
                }
            };
        }]);

    mod.controller('SponsorprojectsCtrl', ['CrudCreator', '$scope',
        'projectModel', 'projectContext', 'projectSponsorContext',
        function (ngCrud, $scope, model, url, parentUrl) {
            ngCrud.extendAggChildCtrl({
                name: 'projects',
                displayName: 'Projects',
                parentUrl: parentUrl,
                listUrl: url,
                ctrl: this,
                scope: $scope,
                model: model
            });
            this.loadRefOptions();
        }]);

    mod.controller('projectSponsorProfileCtrl', ['$scope','Restangular', function ($scope,Restangular) {
            $scope.getCurrentProjectSponsor = function () {
            Restangular.all("projectSponsors").customGET('current').then(function (response) {
                $scope.projectSponsor = response;
            });

            Restangular.all("users").customGET('me').then(function (response) {
                $scope.user = response;
            });
        };

            $scope.getCurrentProjectSponsor();

        }]);


    mod.controller('invitationsCtrl', ['$scope','Restangular', function ($scope,Restangular) {
            $scope.getCurrentProjectSponsor = function () {
            Restangular.all("projectSponsors").customGET('current').then(function (response) {
                $scope.projectSponsor = response;
            });

            Restangular.all("users").customGET('me').then(function (response) {
                $scope.user = response;
            });
        };

            $scope.getCurrentProjectSponsor();

        }]);

    mod.controller('candidatesCtrl', ['$scope','$stateParams', 'Restangular', function ($scope, $stateParams, Restangular) {
            $scope.getCandidatesList = function () {
            var idProject = $stateParams.idProject;
            Restangular.all("freelancers/" + idProject + "/totalSkills").getList().then(function (response) {
                $scope.candidates = response;
                $scope.currentProject = idProject;
            });

        };

            $scope.getCandidatesList();

        }]);

    mod.controller('freelancerDetailsCtrl', ['$scope','$stateParams', 'Restangular', function ($scope, $stateParams, Restangular) {
            $scope.getFreelancerDetails = function () {
            var idFreelancer = $stateParams.idFreelancer;
            Restangular.one("freelancers/" + idFreelancer).get().then(function (response) {
                $scope.freelancer = response;
            });

        };

            $scope.getFreelancerDetails();

        }]);

    mod.controller('agreementResultCtrl', ['$scope','$stateParams', 'Restangular', function ($scope, $stateParams, Restangular) {
            $scope.getAgreementResult = function () {
            var idFreelancer = $stateParams.idFreelancer;
            var idProject = $stateParams.idProject;
            Restangular.one("agreements/" + idFreelancer + "/agreementsInvited/" + idProject).post().then(function (response) {
                $scope.agreement = response;
            });

        };

            $scope.getAgreementResult();

        }]);

})(window.angular);
