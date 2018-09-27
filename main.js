/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, brackets, console */

/**Convert between case on selection of a text */
define(function (require, exports, module) {
    "use strict";

    var CommandManager = brackets.getModule("command/CommandManager"),
        Menus = brackets.getModule("command/Menus"),
        AppInit = brackets.getModule("utils/AppInit"),
        EditorManager = brackets.getModule("editor/EditorManager"),
        NodeDomain      = brackets.getModule("utils/NodeDomain"),
        ExtensionUtils = brackets.getModule("utils/ExtensionUtils");
    
    var  RIGHT_CLICK_MENU_CONVERT_CASE_NAME   = "Convert Case",
         CAMEL_CASE_NAME = "Camel Case",
         CAMEL_CASE_COMMAND_ID = "camelcase",
         CONSTANT_CASE_NAME = "Constant Case",
         CONSTANT_CASE_COMMAND_ID = "constantcase",
         DOT_CASE_NAME = "Dot Case",
         DOT_CASE_COMMAND_ID = "dotcase",
         HEADER_CASE_NAME = "Header Case",
         HEADER_CASE_COMMAND_ID = "headercase",
         LOWER_CASE_NAME = "Lower Case",
         LOWER_CASE_COMMAND_ID = "lowercase",
         LOWERCASEFIRST_CASE_NAME = "Lower Case First",
         LOWERCASEFIRST_CASE_COMMAND_ID = "lowercasefirst",
         NO_CASE_NAME = "No Case",
         NO_CASE_COMMAND_ID = "nocase",
         PARAM_CASE_NAME = "Param Case",
         PARAM_CASE_COMMAND_ID = "paramcase",
         PASCAL_CASE_NAME = "Pascal Case",
         PASCAL_CASE_COMMAND_ID = "pascalcase",
         PATH_CASE_NAME = "Path Case",
         PATH_CASE_COMMAND_ID = "pathcase",
         SENTENCE_CASE_NAME = "Sentence Case",
         SENTENCE_CASE_COMMAND_ID = "sentencecase",
         SNAKE_CASE_NAME = "Snake Case",
         SNAKE_CASE_COMMAND_ID = "snakecase",
         SWAP_CASE_NAME = "Swap Case",
         SWAP_CASE_COMMAND_ID = "swapcase",
         TITLE_CASE_NAME = "Title Case",
         TITLE_CASE_COMMAND_ID = "titlecase",
         UPPER_CASE_NAME = "Upper Case",
         UPPER_CASE_COMMAND_ID = "uppercase",
         UPPERCASEFIRST_CASE_NAME = "Upper Case First",
         UPPERCASEFIRST_CASE_COMMAND_ID = "uppercasefirst";
       
    //node domain for case conversion
    var changeCaseDomain     = new NodeDomain("changeCase", ExtensionUtils.getModulePath(module, "node/ChangeCase")); 
        
    var subMenu = null;
    
    // handler for case conversion
    function convertCase(cmdId) {
        var editor = EditorManager.getFocusedEditor();
        if (editor) {
            var selectedText = editor._codeMirror.getSelections();
               
            changeCaseDomain.exec("caseConvert", selectedText, cmdId).done(function (convertedText) {
                editor._codeMirror.replaceSelections(convertedText);
            }).fail(function (err) {
                console.error("[CaseConverter] failed to run case conversion", err);
            });  
        }
    }
    
    //add the menu items
    function RegisterMenuItems(cmdName, cmdId) {
        if (subMenu) {
            CommandManager.register(cmdName, cmdId, function() {
                convertCase(cmdId);
            });
            subMenu.addMenuItem(cmdId);                    
        }
    }
    
    AppInit.appReady(function () {
        //Add menu entries
        subMenu = Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU).addSubMenu(RIGHT_CLICK_MENU_CONVERT_CASE_NAME, "RIGHT_CLICK_MENU_CONVERT_CASE_NAME");
        RegisterMenuItems(CAMEL_CASE_NAME, CAMEL_CASE_COMMAND_ID);
        RegisterMenuItems(CONSTANT_CASE_NAME, CONSTANT_CASE_COMMAND_ID);
        RegisterMenuItems(DOT_CASE_NAME, DOT_CASE_COMMAND_ID);
        RegisterMenuItems(HEADER_CASE_NAME, HEADER_CASE_COMMAND_ID);
        RegisterMenuItems(LOWER_CASE_NAME, LOWER_CASE_COMMAND_ID);
        RegisterMenuItems(LOWERCASEFIRST_CASE_NAME, LOWERCASEFIRST_CASE_COMMAND_ID);
        RegisterMenuItems(NO_CASE_NAME, NO_CASE_COMMAND_ID);
        RegisterMenuItems(PARAM_CASE_NAME, PARAM_CASE_COMMAND_ID);
        RegisterMenuItems(PASCAL_CASE_NAME, PASCAL_CASE_COMMAND_ID);
        RegisterMenuItems(PATH_CASE_NAME, PATH_CASE_COMMAND_ID);
        RegisterMenuItems(SENTENCE_CASE_NAME, SENTENCE_CASE_COMMAND_ID);
        RegisterMenuItems(SNAKE_CASE_NAME, SNAKE_CASE_COMMAND_ID);
        RegisterMenuItems(SWAP_CASE_NAME, SWAP_CASE_COMMAND_ID);
        RegisterMenuItems(TITLE_CASE_NAME, TITLE_CASE_COMMAND_ID);
        RegisterMenuItems(UPPER_CASE_NAME, UPPER_CASE_COMMAND_ID);
        RegisterMenuItems(UPPERCASEFIRST_CASE_NAME, UPPERCASEFIRST_CASE_COMMAND_ID);
    });
   
});