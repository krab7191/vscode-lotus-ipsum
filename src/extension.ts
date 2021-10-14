
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import fetch from 'node-fetch';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Lotus Ipsum is ready to get you some MTG placeholder text!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand('lotus', async () => {

    const editor = vscode.window.activeTextEditor as vscode.TextEditor;

    // The code you place here will be executed every time your command is executed
    // Display a message box to the user

    try {

      const response = await fetch('https://lotus-ipsum.herokuapp.com/api/ipsum/1');
      const data: any = await response.json();

      editor.edit(textEdit => {
        textEdit.insert(editor.selection.active, data.text.replace(/[\n\r]/g, '').replace(/\'/g, '&apos;'));
      });

    } catch (err) {
      console.log(err);
    }
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
