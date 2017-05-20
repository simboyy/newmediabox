(function(angular, undefined) {
  angular.module("mediaboxApp.constants", [])

.constant("appConfig", {
	"userRoles": [
		"guest",
		"user",
		"manager",
		"admin"
	],
	"reviewSettings": {
		"enabled": true,
		"moderate": false
	},
	"wishlist": true,
	"mailOptions": {}
})

;
})(angular);