import { fireEvent, getByText } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

let dom;
let container;

describe('calculator functionality', () => {
  beforeEach(() => {
    // Constructing a new JSDOM with this option is the key
    // to getting the code in the script tag to execute.
    // This is indeed dangerous and should only be done with trusted content.
    // https://github.com/jsdom/jsdom#executing-scripts
    dom = new JSDOM(html, { runScripts: 'dangerously' });
    container = dom.window.document.body;
  })

  test('has an add button', () => {
    expect(container.querySelector('.btn-outline-primary')).not.toBeNull();
    expect(getByText(container, '+')).toBeInTheDocument();
  })

  test('has a subtract button', () => {
    expect(container.querySelector('.btn-outline-success')).not.toBeNull();
    expect(getByText(container, '-')).toBeInTheDocument();
  })

  test('has a multiply button', () => {
    expect(container.querySelector('.btn-outline-warning')).not.toBeNull();
    expect(getByText(container, '*')).toBeInTheDocument();
  })

  test('has a divide button', () => {
    expect(container.querySelector('.btn-outline-danger')).not.toBeNull();
    expect(getByText(container, '/')).toBeInTheDocument();
  })

  test('can add two numbers', () => {

    let number1 = container.querySelector("#input1");
    let number2 = container.querySelector("#input2");

    fireEvent.change(number1, {target: { value: 3 } });
    fireEvent.change(number2, {target: { value: 2 } });

    const button = getByText(container, '+');
    fireEvent.click(button);

    let result = container.querySelector("#output");
    expect(parseFloat(result.innerHTML)).toBe(5);
  })

  test('can subtract two numbers', () => {

    let number1 = container.querySelector("#input1");
    let number2 = container.querySelector("#input2");

    fireEvent.change(number1, {target: { value: 3 } });
    fireEvent.change(number2, {target: { value: 2 } });

    const button = getByText(container, '-');
    fireEvent.click(button);

    let result = container.querySelector("#output");
    expect(parseFloat(result.innerHTML)).toBe(1);
  })

  test('can divide two numbers', () => {

    let number1 = container.querySelector("#input1");
    let number2 = container.querySelector("#input2");

    fireEvent.change(number1, {target: { value: 6 } });
    fireEvent.change(number2, {target: { value: 2 } });

    const button = getByText(container, '/');
    fireEvent.click(button);

    let result = container.querySelector("#output");
    expect(parseFloat(result.innerHTML)).toBe(3);
  })

  test('can multiply two numbers', () => {

    let number1 = container.querySelector("#input1");
    let number2 = container.querySelector("#input2");

    fireEvent.change(number1, {target: { value: 6 } });
    fireEvent.change(number2, {target: { value: 2 } });

    const button = getByText(container, '*');
    fireEvent.click(button);

    let result = container.querySelector("#output");
    expect(parseFloat(result.innerHTML)).toBe(12);
  })

})