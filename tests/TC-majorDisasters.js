
			  var fs = require('fs');
 
    // abstract writing screen shot to a file
    function writeScreenShot(data, filename) {
        var stream = fs.createWriteStream(filename);
        stream.write(new Buffer(data, 'base64'));
        stream.end();
    }
 

describe("Testing for 'major-disasters'", function () {
	var itemName = "testProtractor_" + Date.now();
	var until = protractor.ExpectedConditions;
	
	beforeAll(function(){
		//browser.takeScreenshot().then(function (png) {
			//expect(resultModal.getText()).toContain('La operación se ha completado con éxito');
			//console.log('tested created')
		browser.get("http://localhost:8080/#!/major-disasters");
			//element(by.css('[ng-click="closeThisDialog(0)"]')).click();
			//writeScreenShot(png, 'exception.png');
    	//});
		
	});

	it("Should be non empty", function () {
		
		expect(element.all(by.repeater("d in data")).count()).toBeGreaterThan(0);
		//console.log('tested non empty')
	});

	it("Should create an item with event '" + itemName + "'", function () {
		browser.wait(until.presenceOf((element(by.id('openModal')))))//.then(function () {
			element(by.id('openModal')).click();
			var modal = element(by.name('formItem'));
			browser.wait(until.presenceOf(modal), 5000, "Modal took too long to appear!");
			element(by.model('tmp.type.val')).sendKeys('testType1');
			element(by.model('tmp.country.val')).sendKeys('testCountry');
			element(by.id('addTypeToArray')).click();
			element(by.id('addCountryToArray')).click();

			//console.log('hey im visible')
			element(by.model('nData.event')).click()
			
			element(by.model('nData.event')).sendKeys(itemName);
			//console.log('filled event')
			element(by.model('nData.year')).click()
			element(by.model('nData.year')).sendKeys('1999');
			
			//console.log('filled year')
			element(by.model('nData.death')).click()
			element(by.model('nData.death')).sendKeys('99');
			
			//console.log('filled death')
			element(by.model('nData.inflation')).click()
			element(by.model('nData.inflation')).sendKeys('199');
			
			//console.log('filled inflation')
			element(by.model("nData['no-inflation']")).click()
			element(by.model("nData['no-inflation']")).sendKeys('99');
			
			//console.log('filled no inflation')
			//element(by.model('tmp.type.val')).click()
			
			//console.log('filled type')
			element(by.name('formItem')).submit()
			var resultModal = element(by.id('ngdialog2'));
			browser.wait(until.visibilityOf(resultModal), 5000, "Result Modal took to long to appear")
			//browser.takeScreenshot().then(function (png) {
			expect(resultModal.getText()).toContain('La operación se ha completado con éxito');
			//console.log('tested created')
			element(by.css('[ng-click="closeThisDialog(0)"]')).click();
			//writeScreenShot(png, 'exception.png');
    		//});
			

    // ...
 
    // within a test:
    
			
		
		

		//}).catch(function (asd) {
			//console.log('modal was not visible', asd)
		//});

	});
	
	it("Should show the created item", function () {
		var filterInput = element(by.model('filter.event'));
		browser.wait(until.visibilityOf(filterInput), 5000, 'Input filter field took too long!').then(function () {
			filterInput.click().clear().sendKeys(itemName);
			expect(element.all(by.repeater("d in data")).count()).toBe(1);
		});
	});
	
	it("Should delete the created item", function () {
		element(by.model('filter.event')).click().clear().sendKeys(itemName);
		var row = element.all(by.repeater("d in data")).first().all(by.tagName("button")).last().click();
		var resultModal = element(by.id('ngdialog3'));
		browser.wait(until.visibilityOf(resultModal), 5000, "Result Modal (delete) took to long to appear").then(function () {
			expect(resultModal.getText()).toContain('La operación se ha completado con éxito');
			element(by.css('[ng-click="closeThisDialog(0)"]')).click();
		});
	});
});