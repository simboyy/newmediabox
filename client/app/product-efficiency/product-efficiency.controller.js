angular.module('mediaboxApp')
    .controller('ProductEfficiencyController', ['$q', 'EmployeeList', 'EmployeeSales', 'EmployeeTeamSales', 'EmployeeAverageSales', 'EmployeeQuarterSales',
    function ($q, EmployeeList, EmployeeSales, EmployeeTeamSales, EmployeeAverageSales, EmployeeQuarterSales) {


        this.startDate = new Date(2017, 0, 1);

        this.endDate = new Date(2017, 11, 1);

        this.currentDate = new Date(2017, 5, 8);

        this.currentEmployee = null;

        var employeeTeamSales = EmployeeTeamSales.query();


        var employeeAverageSales = EmployeeAverageSales.query();

        var employeeQuarterSales = EmployeeQuarterSales.query();

        var employeeList = EmployeeList.query();

        
        var employeeSales = EmployeeSales.query();

        //console.log(employeeSales);

        this.employeeListDataSource = new kendo.data.DataSource();

        this.employeeTeamSalesDataSource = new kendo.data.DataSource();

        this.employeeQuarterSalesDataSource = new kendo.data.DataSource();

        this.employeeAverageSalesDataSource = new kendo.data.DataSource({
            aggregate: [{
                field: 'EmployeeSales',
                aggregate: 'average'
            }]
        });

        this.employeeSalesDataSource = new kendo.data.SchedulerDataSource();

        this.changeCurrentEmployee = function(employee) {

            //console.log(employee);
            this.currentEmployee = employee;

            var currentEmployeeQuarterSales = employeeQuarterSales.filter(function(sale) {
                return sale.EmployeeID == employee.EmployeeID;
            })[0].Sales;

            //console.log(currentEmployeeQuarterSales);

            this.currentEmployeeQuarterSales = currentEmployeeQuarterSales[0].Current;

            this.employeeQuarterSalesDataSource.data(currentEmployeeQuarterSales);

            var currentEmployeeTeamSales = employeeTeamSales.filter(function(sale) {
                return sale.EmployeeID == employee.EmployeeID;
            })[0].Sales;

            this.employeeTeamSalesDataSource.data(currentEmployeeTeamSales);

            var currentEmployeeAverageSales = employeeAverageSales.filter(function(sale){
                return sale.EmployeeID == employee.EmployeeID;
            });

            this.employeeAverageSalesDataSource.data(currentEmployeeAverageSales);

            var aggregates = this.employeeAverageSalesDataSource.aggregates();

            this.currentEmployeeAverageSalesNumber = aggregates.EmployeeSales ? aggregates.EmployeeSales.average : 0;

            var currentEmployeeSales = employeeSales.filter(function(sale) {
                return sale.EmployeeID == employee.EmployeeID;
            }).map(function(sale) {
                return {
                    description: sale.Description,
                    start: kendo.parseDate(sale.Start),
                    title: sale.Title,
                    end: kendo.parseDate(sale.End)
                };
            });

            this.employeeSalesDataSource.data(currentEmployeeSales);
        };

        $q.all([employeeQuarterSales.$promise, employeeList.$promise, employeeAverageSales.$promise, employeeTeamSales.$promise, employeeSales.$promise]).then(function() {
            this.employeeListDataSource.data(employeeList);
            this.changeCurrentEmployee(employeeList[0]);
        }.bind(this));
    }]);
