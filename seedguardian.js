// seedguardian.js - by Mathieu Gorichon - released under MIT License

var SplitCtrl = function ($scope) {
    $scope.split = function() {
        $scope.showError = false;

        // Generate a new seed if empty
        if ($scope.humanSeed === '') {
            $scope.seed = secrets.random(128);
            $scope.humanSeed = mn_encode($scope.seed); 
        } else {
            $scope.seed = mn_decode($scope.humanSeed);
        }
        
        try {
            $scope.humanShares = humanizer.split($scope.seed, $scope.sharesNumber, $scope.threshold);
            // Display shares
            $scope.showShares = true;
        } catch(error) {
            $scope.errorMessage = error;
            $scope.showError = true;
            $scope.showShares = false;
        }
    }

    $scope.init = function() {
        $scope.showShares = false;
        $scope.showError = false;
        $scope.errorMessage = '';

        $scope.walletType = 'electrum';
        $scope.sharesNumber = 3;
        $scope.threshold = 2;
        
        // Seed is the random number used to generate all keys. 
        // Called seed in electrum (128bits) and root key in armory (256 bits)
        // here represented in a string in hexadecimal
        $scope.seed = '';
        
        // Human seed is the human-readable version of the seed,
        // Called seed in electrum, chain code in armory
        $scope.humanSeed = '';
        
        // Human version of the shares
        $scope.humanShares = '';
    }

    $scope.init();
};

var ReconstructCtrl = function ($scope) {
    $scope.onChange = function() {
        // If field is empty, remove all shares but first one.
        console.log($scope.humanShares);
        if (!$scope.humanShares[1]) {
            $scope.humanShares = {1: ''};
        }

        // If words number === 15
        if ($scope.humanShares[1] && $scope.humanShares[1].split(' ').length === 15) {
            try {
                var sharesThreshold = humanizer.getSharesThreshold($scope.humanShares[1]);
                var displayedHumanSharesCount = Object.keys($scope.humanShares).length;
                var diff = sharesThreshold - displayedHumanSharesCount;
                // Add shares
                if (diff > 0) {
                    for (var i = 0 ; i < diff ; i++){
                        $scope.addShare();
                    }
                // Remove shares
                } else if ( diff < 0) {
                    for (var i = 0 ; i > diff ; i--){
                        $scope.removeShare();
                    }
                }
            } catch (error) {
                console.log("Can't get threshold from entered share");
            }
        }
    }

    $scope.reconstruct = function() {
        $scope.showError = false;
        // Build array from humanShares data model
        var shares = []
        for (var i in $scope.humanShares) {
            shares.push($scope.humanShares[i]);
        }
         
        try {
            $scope.humanSeed = humanizer.reconstruct(shares);
            // Display shares
            $scope.showSeed = true;
        } catch(error) {
            $scope.errorMessage = error;
            $scope.showError = true;
        }
    }

    $scope.addShare = function() {
        var sharesNumber = Object.keys($scope.humanShares).length;
        $scope.humanShares[sharesNumber + 1] = '';
    }

    $scope.removeShare = function() {
        var sharesNumber = Object.keys($scope.humanShares).length;
        delete $scope.humanShares[sharesNumber];
    }

    $scope.init = function() {
        $scope.showSeed = false;
        $scope.showError = false;
        $scope.errorMessage = '';
        $scope.humanShares = {1: ''};
        $scope.hexShares = [];
        $scope.humanSeed = '';
        $scope.hexSeed = '';
    }
    
    $scope.init();
}