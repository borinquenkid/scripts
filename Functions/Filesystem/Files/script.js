var fileAnalyser = Bean("fileAnalyser");
var fileUtilities = Bean("fileUtilities");

var mkdir = function (directoryPath) {
    fileUtilities.mkdir(new java.io.File(directoryPath))
};

var fileExists = function (filePath) {
    return new java.io.File(filePath).exists();
};

var createTempFile = function (extension) {
    return java.io.File.createTempFile("playonlinux", "." + extension).getAbsolutePath();
};

var Checksum = function () {
    var that = this;
    that._method = "SHA",
        that._checksumCalculator = Bean("checksumCalculator"),
        that.wizard = function (wizard) {
            that._wizard = wizard;
            return that;
        };
    that.method = function (algorithm) {
        that._method = algorithm;
        return that;
    };
    that.of = function (file) {
        that._file = file;
        return that;
    };
    that.get = function () {
        var progressBar = that._wizard.progressBar("Checking file consistency...");

        return that._checksumCalculator.calculate(that._file, that._method, function (progressEntity) {
            progressBar.accept(progressEntity);
        });
    }
};