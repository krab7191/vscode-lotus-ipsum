/* eslint-disable @typescript-eslint/naming-convention */

import * as vscode from 'vscode';
import axios from 'axios';

const { window, commands } = vscode;
const { createOutputChannel, showInformationMessage, activeTextEditor } = window;
const { registerCommand } = commands;


export function activate(context: vscode.ExtensionContext) {
	// Start debug messenger
	const debugLog = createOutputChannel('debugLog');

	const disposable = registerCommand('lotus', async () => {
		showInformationMessage('Getting you some MTG themed placeholder content!');
		debugLog.append('Getting you some MTG themed placeholder content!');

		try {
			// Handle to editor
			const editor = activeTextEditor as vscode.TextEditor;

			// Fetch data from API
			const { data }: any = await axios({
				url: 'https://lotus-ipsum.fly.dev/api/ipsum/1',
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			});

			editor.edit(textEdit => {
				textEdit.insert(editor.selection.active, data.text.replace(/[\n\r]/g, '').replace(/\'/g, '&apos;'));
			});
			

		} catch (err: any) {
			debugLog.appendLine(err);
			showInformationMessage('Sorry, an error occurred. Check the logs for more details and try again.');
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
