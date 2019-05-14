
			  var fs = require('fs');
 
    // abstract writing screen shot to a file
    function writeScreenShot(data, filename) {
        var stream = fs.createWriteStream(filename);
        stream.write(new Buffer(data, 'base64'));
        stream.end();
    }


describe("Testing for 'testing-of-nuclear-bombs'", function () {
	var itemName = "testProtractor_" + Date.now();
	var until = protractor.ExpectedConditions;
	
	beforeAll(function(){
		//browser.takeScreenshot().then(function (png) {
			//expect(resultModal.getText()).toContain('La operación se ha completado con éxito');
			//console.log('tested created')
		browser.get("http://localhost:8080/#!/testing-of-nuclear-bombs");
			//element(by.css('[ng-click="closeThisDialog(0)"]')).click();
			//writeScreenShot(png, 'exception.png');
    	//});
		
	});

	it("Should be non empty", function () {
		
		expect(element.all(by.repeater("item in data")).count()).toBeGreaterThan(0);
		//console.log('tested non empty')
	});

	it("Should create an item with event '" + itemName + "'", function () {

			element(by.model('body.name')).sendKeys(itemName);
			element(by.model('body.country')).sendKeys('spain');
			element(by.model('body.year')).sendKeys('1111');
			element(by.model('body.maxYield')).sendKeys('500');
			element(by.model('body.shot')).sendKeys('8');
			element(by.model('body.hob')).sendKeys('210');
			
			element(by.id('Crear')).click();
			
			//console.log('filled no inflation')
			//element(by.model('tmp.type.val')).click()
			
			//console.log('filled type')
	
	});
	
	it("Should show the created item", function () {
		element(by.model('filter.from')).sendKeys("1111");
		element(by.model('filter.to')).sendKeys("1112");
		element(by.id('FiltrarAño')).click();
		expect(element.all(by.repeater("item in data")).count()).toBe(1);
	
	});
	
	it("Should delete the created item", function () {
		element.all(by.repeater("item in data")).first().all(by.tagName("button")).last().click();
		browser.takeScreenshot().then(function (png) {
        writeScreenShot(png, 'exception.png');
    });
	});
	
});