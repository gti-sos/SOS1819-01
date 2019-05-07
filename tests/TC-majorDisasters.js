describe("Testing for 'major-disasters'", function () {
	var itemName = "testProtractor_" + Date.now();
	var until = protractor.ExpectedConditions;
	
	it("Should be non empty", function () {
			browser.get("http://localhost:8080/#!/major-disasters");
			expect(element.all(by.repeater("d in data")).count()).toBeGreaterThan(0);
		});

	it("Should create an item with event '" + itemName + "'", function () {
		browser.get("http://localhost:8080/#!/major-disasters");
		browser.wait(until.urlIs("http://localhost:8080/#!/major-disasters"), 5000);    
		element(by.id('openModal')).click();
		var modal = element(by.id('ngdialog1'));
		browser.wait(until.visibilityOf(modal), 5000, "Modal took too long to appear!");
		element(by.model('nData.event')).sendKeys(itemName);
		element(by.model('nData.year')).sendKeys('1999');
		element(by.model('nData.death')).sendKeys('99');
		element(by.model('nData.inflation')).sendKeys('199');
		element(by.model("nData['no-inflation']")).sendKeys('99');
		element(by.model('tmp.type.val')).sendKeys('testType1');
		element(by.id('addTypeToArray')).click();
		element(by.model('tmp.type.val')).sendKeys('testType2');
		element(by.id('addTypeToArray')).click();
		element(by.model('tmp.country.val')).sendKeys('testCountry');
		element(by.id('addCountryToArray')).click();
		element(by.name('formItem')).submit();
		var resultModal = element(by.id('ngdialog2'));
		browser.wait(until.visibilityOf(resultModal), 5000, "Result Modal took to long to appear");
		expect(resultModal.getText()).toContain('La operación se ha completado con éxito');
		element(by.css('[ng-click="closeThisDialog(0)"]')).click();

	});
	
	it("Should show the created item", function () {
		browser.get("http://localhost:8080/#!/major-disasters");
		element(by.model('filter.event')).click().clear().sendKeys(itemName);
		expect(element.all(by.repeater("d in data")).count()).toBe(1);
	});

	it("Should delete the created item", function () {
		browser.get("http://localhost:8080/#!/major-disasters");
		element(by.model('filter.event')).click().clear().sendKeys(itemName);
		var row = element.all(by.repeater("d in data")).first().all(by.tagName("button")).last().click();
		var resultModal = element(by.id('ngdialog1'));
		browser.wait(until.visibilityOf(resultModal), 5000, "Result Modal took to long to appear");
		expect(resultModal.getText()).toContain('La operación se ha completado con éxito');
		element(by.css('[ng-click="closeThisDialog(0)"]')).click();
	});
});