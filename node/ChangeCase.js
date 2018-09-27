(function () {
    "use strict";

    var changeCaseModule = require('change-case'),
        domainManager;

    function caseConvert(selText, cmdId) {
        var convertedText = selText.map(function (text) {
            if (cmdId === "camelcase") {
                return changeCaseModule.camelCase(text);
            } else if (cmdId === "constantcase") {
                return changeCaseModule.constantCase(text);
            } else if (cmdId === "dotcase") {
                return changeCaseModule.dotCase(text);
            } else if (cmdId === "headercase") {
                return changeCaseModule.headerCase(text);
            } else if (cmdId === "lowercase") {
                return changeCaseModule.lowerCase(text);
            } else if (cmdId === "lowercasefirst") {
                return changeCaseModule.lowerCaseFirst(text);
            } else if (cmdId === "nocase") {
                return changeCaseModule.noCase(text);
            } else if (cmdId === "paramcase") {
                return changeCaseModule.paramCase(text);
            } else if (cmdId === "pascalcase") {
                return changeCaseModule.pascalCase(text);
            } else if (cmdId === "pathcase") {
                return changeCaseModule.pathCase(text);
            } else if (cmdId === "sentencecase") {
                return changeCaseModule.sentenceCase(text);
            } else if (cmdId === "snakecase") {
                return changeCaseModule.snakeCase(text);
            } else if (cmdId === "swapcase") {
                return changeCaseModule.swapCase(text);
            } else if (cmdId === "titlecase") {
                return changeCaseModule.titleCase(text);
            } else if (cmdId === "uppercase") {
                return changeCaseModule.upperCase(text);
            } else if (cmdId === "uppercasefirst") {
                return changeCaseModule.upperCaseFirst(text);
            }
        });
        return convertedText;
    }

    function init(domainManagerPassed) {
        domainManager = domainManagerPassed;
        if (!domainManager.hasDomain("changeCase")) {
            domainManager.registerDomain("changeCase", {
                major: 0,
                minor: 1
            });
        }
        domainManager.registerCommand("changeCase",
            "caseConvert",
            caseConvert,
            false,
            "Converts the case", [{
                name: "text",
                type: "string",
                description: "text to be case converted"
            },
            {
                name: "CmdId",
                type: "string",
                description: "case to be converted"
            }],
            [{name: "convertedText", // return values
              type: "string",
              description: "case converted text"}]
        );
    }

    exports.init = init;
}());