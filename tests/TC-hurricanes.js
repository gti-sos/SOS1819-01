 
var fs = require('fs');
 
    // abstract writing screen shot to a file
    function writeScreenShot(data, filename) {
        var stream = fs.createWriteStream(filename);
        stream.write(new Buffer(data, 'base64'));
        stream.end();
    }
 
    // ...
 
    // within a test:
    
describe("Testing for 'hurricanes'", function () {
	var itemName = "testProtractor_" + Date.now();
	var until = protractor.ExpectedConditions;
	
	beforeAll(function(){
		browser.get("http://localhost:8080/#!/hurricanes");
	});

	it("Should be non empty", function () {
		expect(element.all(by.repeater("hurricane in hurricanes")).count()).toBeGreaterThan(0);
	});

	it("Should create an hurricane '" + itemName + "'", function () {

			element(by.model('body.name')).sendKeys(itemName);
			element(by.model('body.year')).sendKeys('10');
			element(by.model('body.country')).sendKeys('Neverland');
			element(by.model('body.speed')).sendKeys('10');
			element(by.model("body.damagesuntil2008")).sendKeys('1');
			element(by.model('body.mbar')).sendKeys('100');
			element(by.id('añadir')).click();
	});
	
	it("Should show the created item", function () {
			element(by.model("filter.from")).sendKeys("1");
			element(by.model("filter.to")).sendKeys("11");
			element(by.id('busquedaPorAño')).click();

			expect(element.all(by.repeater("hurricane in hurricanes")).count()).toBe(1);
		});
	
	it("Should delete the created item", function () {
		element.all(by.repeater("hurricane in hurricanes")).first().all(by.tagName("button")).last().click();
		browser.takeScreenshot().then(function (png) {
        writeScreenShot(png, 'exception.png');
    });
    
	//	element(by.id('busquedaPorAño')).click();
	});

});


