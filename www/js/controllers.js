angular.module('starter.controllers', ['ngCookies'])

.config(['$httpProvider', function($httpProvider) {
    // $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    // $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    // $httpProvider.defaults.headers.post['X-CSRFToken'] = Cookies.get('csrftoken');
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    // $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
}])
.controller('DashCtrl', function($scope, $http) {

  console.log(Cookies.get('csrftoken'));
  $scope.postData = function() {
    // $http.post('http://10.107.168.155:8000/api/user/login', {'csrfmiddlewaretoken':Cookies.get('csrftoken')} ).
    //   success(function(data, status, headers, config) {
    //     console.log('post deliveryDone berhasil');
    //     alert('Success : Delivery has been done');
    //   }).
    //   error(function(data, status, headers, config) {
    //     console.log('post storeData gagal');
    //     console.log(data);
    // });
    var request = $http({
        method: "post",
        url: "http://10.107.168.155:8000/api/user/login",
        data: {
            username: 'test',
            password: "test",
            csrfmiddlewaretoken: Cookies.get('csrftoken')
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    // Store the data-dump of the FORM scope.
    request.success(
        function( html ) {
            // $scope.cfdump = html;
            console.log(html);
        }
    );
  };

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
})

.controller('cekHargaPasar', function($scope, $http) {
  $http.get('http://10.107.168.155:8000/api/province').then(function(resp) {
    console.log('Success', resp);
    // For JSON responses, resp.data contains the result

    $scope.provinces = resp.data.data;
    console.log($scope.provinces);
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })
})

.controller('cekHargaKomoditas', function($scope, $http) {
  $http.get('http://10.107.168.155:8000/api/commodities').then(function(resp) {
    console.log('Success', resp);
    // For JSON responses, resp.data contains the result

    $scope.commodities = resp.data.data;
    console.log($scope.commodities);
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })
})

.controller('cekHargaKomoditasGoods', function($scope, $stateParams, $http) {
  $http.get('http://10.107.168.155:8000/api/goods/?goods='+$stateParams.goods).then(function(resp) {
    console.log('Success', resp);
    $scope.now_id = $stateParams.goods;
    $scope.goods = resp.data.data;
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })
})

.controller('cekHargaKomoditasGoodsChild', function($scope, $stateParams, $http) {
  $http.get('http://10.107.168.155:8000/api/goods_childs/?goods='+$stateParams.goods).then(function(resp) {
    console.log('Success', resp);
    $scope.childs = resp.data.data;
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
