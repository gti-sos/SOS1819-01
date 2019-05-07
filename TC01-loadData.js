describe("Data is loaded", function () {
	it("should be non empty", function () {
		browser.get("http://localhost:8080/#!/major-disasters");
		var majorDisasters = element.all(by.repeater("d in data"));
		expect(majorDisasters.count()).toBe(10);
	});
});