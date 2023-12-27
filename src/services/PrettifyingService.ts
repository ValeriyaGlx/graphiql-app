import type { errorMessagePrettifying } from '../types';

class PrettifyingService {
  whitespace: number;

  constructor(whitespace: number) {
    this.whitespace = whitespace;
  }

  private removeEmptyLinesAndParagraphs(query: string): string {
    const lines = query.split(' ');
    const nonEmptyLines = lines.filter((line) => line.trim() !== '');
    const result = nonEmptyLines.join('');
    return result.split('\n').join('');
  }

  private checkBracketsValidity(query: string): boolean | string {
    const stack: string[] = [];

    for (const el of query) {
      if (el === '{') {
        stack.push('{');
      } else if (el === '}') {
        if (stack.length === 0 || stack.pop() !== '{') {
          return '}';
        }
      }
    }

    if (stack.length > 0) {
      return '{';
    }

    return true;
  }

  public formatJSON(query: string) {
    const queryWithoutEmptyLines = this.removeEmptyLinesAndParagraphs(query);
    let result = '';
    let indentationLevel = 0;

    for (let i = 0; i < queryWithoutEmptyLines.length; i++) {
      const el = queryWithoutEmptyLines[i];
      if (el === '{' || el === '[') {
        indentationLevel++;
        result += `${el}\n` + '  '.repeat(indentationLevel);
      } else if (el === '}' || el === ']') {
        indentationLevel--;
        result += '\n' + '  '.repeat(indentationLevel) + el;
      } else if (el === ',') {
        result += ',' + '\n' + '  '.repeat(indentationLevel);
      } else {
        result += el;
      }
    }

    return result;
  }

  public formatQuery(query: string, errorMessage: errorMessagePrettifying): string | Array<string> {
    try {
      const validationResult = this.checkBracketsValidity(query);
      if (typeof validationResult === 'string') {
        throw new Error(validationResult);
      }
      return this.formatJSON(query);
    } catch (error) {
      if ((error as Error).message === '{') {
        return [errorMessage.textOpeningParenthesis];
      } else {
        return [errorMessage.textClosingParenthesis];
      }
    }
  }
}

const prettifyingService = new PrettifyingService(2);

export default prettifyingService;
