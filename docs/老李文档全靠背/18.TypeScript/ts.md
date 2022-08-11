# 1. 初识 TypeScript

**TypeScript 是 JavaScript 的一个超集**，主要提供了**类型系统**和**对 ES6+ 的支持**，它由 Microsoft 开发，代码[开源于 GitHub](https://github.com/Microsoft/TypeScript) 上
![TS与JS.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/28ca61cc160c417c8497a00defdca5f0~tplv-k3u1fbpfcp-watermark.image)

## TypeScript 的特点

TypeScript 主要有 3 大特点：

- **始于 JavaScript，归于 JavaScript**

TypeScript 可以编译出纯净、 简洁的 JavaScript 代码，并且可以运行在任何浏览器上、Node.js 环境中和任何支持 ECMAScript 3（或更高版本）的 JavaScript 引擎中。

- **强大的类型系统**

**类型系统**允许 JavaScript 开发者在开发 JavaScript 应用程序时使用高效的开发工具和常用操作比如静态检查和代码重构。

- **先进的 JavaScript**

TypeScript 提供最新的和不断发展的 JavaScript 特性，包括那些来自 2015 年的 ECMAScript 和未来的提案中的特性，比如异步功能和 Decorators，以帮助建立健壮的组件。

# 2. 安装 TypeScript

命令行运行如下命令，全局安装 TypeScript：

```bash
npm install -g typescript
```

安装完成后，在控制台运行如下命令，检查安装是否成功(3.x)：

```bash
tsc -V
```

# 3. 第一个 TypeScript 程序

## 编写 TS 程序

src/helloworld.ts

```typescript
function greeter(person) {
  return 'Hello, ' + person;
}

let user = 'Yee';

console.log(greeter(user));
```

## 手动编译代码

我们使用了 `.ts` 扩展名，但是这段代码仅仅是 JavaScript 而已。

在命令行上，运行 TypeScript 编译器：

```bash
tsc helloworld.ts
```

输出结果为一个 `helloworld.js` 文件，它包含了和输入文件中相同的 JavsScript 代码。

在命令行上，通过 Node.js 运行这段代码：

```bash
node helloworld.js
```

控制台输出：

```
Hello, Yee
```

# 2. 基础类型

TypeScript 支持与 JavaScript 几乎相同的数据类型，此外还提供了实用的枚举类型方便我们使用。

## 2.1 布尔值

最基本的数据类型就是简单的 true/false 值，在 JavaScript 和 TypeScript 里叫做 `boolean`（其它语言中也一样）。

```typescript
let isDone: boolean = false;
isDone = true;
// isDone = 2 // error
```

## 2.2 数字

和 JavaScript 一样，TypeScript 里的所有数字都是浮点数。 这些浮点数的类型是 number。 除了支持十进制和十六进制字面量，TypeScript 还支持 ECMAScript 2015 中引入的二进制和八进制字面量。

```typescript
let a1: number = 10; // 十进制
let a2: number = 0b1010; // 二进制
let a3: number = 0o12; // 八进制
let a4: number = 0xa; // 十六进制
```

## 2.3 字符串

JavaScript 程序的另一项基本操作是处理网页或服务器端的文本数据。 像其它语言里一样，我们使用 `string` 表示文本数据类型。 和 JavaScript 一样，可以使用双引号（`"`）或单引号（`'`）表示字符串。

```typescript
let name: string = 'tom';
name = 'jack';
// name = 12 // error
let age: number = 12;
const info = `My name is ${name}, I am ${age} years old!`;
```

## 2.4 undefined 和 null

TypeScript 里，`undefined` 和 `null` 两者各自有自己的类型分别叫做 `undefined` 和 `null`。 它们的本身的类型用处不是很大：

```typescript
let u: undefined = undefined;
let n: null = null;
```

默认情况下 `null` 和 `undefined` 是所有类型的子类型。 就是说你可以把 `null` 和 `undefined` 赋值给 `number` 类型的变量。

## 2.5 数组

TypeScript 像 JavaScript 一样可以操作数组元素。 有两种方式可以定义数组。 第一种，可以在`元素类型后面接上[]`，表示由此类型元素组成的一个数组：

```typescript
let list1: number[] = [1, 2, 3];
```

第二种方式是使用数组泛型，`Array<元素类型>`：

```typescript
let list2: Array<number> = [1, 2, 3];
```

## 2.6 元组 Tuple

元组类型允许表示一个已知元素数量和类型的数组，`各元素的类型不必相同`。 比如，你可以定义一对值分别为 `string` 和 `number` 类型的元组。

```typescript
let t1: [string, number] = ['hello', 10]; // OK
let t1: [string, number] = [10, 'hello']; // Error
```

当访问一个已知索引的元素，会得到正确的类型：

```typescript
console.log(t1[0].substring(1)); // OK
console.log(t1[1].substring(1)); // Error, 'number' 不存在 'substring' 方法
```

元祖的越界,添加的新元素要符合联合类型

```ts
arr2.push(123);
```

## 2.7 枚举

`enum` 类型是对 JavaScript 标准数据类型的一个补充。 使用枚举类型可以`为一组数值赋予友好的名字`。

```typescript
enum Color {
  Red,
  Green,
  Blue,
}

// 枚举数值默认从0开始依次递增
// 根据特定的名称得到对应的枚举数值
let myColor: Color = Color.Green; // 0
console.log(myColor, Color.Red, Color.Blue);
```

默认情况下，从 `0` 开始为元素编号。 你也可以手动的指定成员的数值。 例如，我们将上面的例子改成从 `1` 开始编号：

```typescript
enum Color {
  Red = 1,
  Green,
  Blue,
}
let c: Color = Color.Green;
```

或者，全部都采用手动赋值：

```typescript
enum Color {
  Red = 1,
  Green = 2,
  Blue = 4,
}
let c: Color = Color.Green;
```

枚举类型提供的一个便利是你可以由枚举的值得到它的名字。 例如，我们知道数值为 2，但是不确定它映射到 Color 里的哪个名字，我们可以查找相应的名字：

```typescript
enum Color {
  Red = 1,
  Green,
  Blue,
}
let colorName: string = Color[2];

console.log(colorName); // 'Green'
```

## 2.8 any

有时候，我们会想要为那些在编程阶段还不清楚类型的变量指定一个类型。 这些值可能来自于动态的内容，比如来自用户输入或第三方代码库。 这种情况下，我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。 那么我们可以使用 `any` 类型来标记这些变量：

```typescript
let notSure: any = 4;
notSure = 'maybe a string';
notSure = false; // 也可以是个 boolean
```

在对现有代码进行改写的时候，`any` 类型是十分有用的，它允许你在编译时可选择地包含或移除类型检查。并且当你只知道一部分数据的类型时，`any` 类型也是有用的。 比如，你有一个数组，它包含了不同的类型的数据：

```typescript
let list: any[] = [1, true, 'free'];

list[1] = 100;
```

## 2.9 void

某种程度上来说，`void` 类型像是与 `any` 类型相反，它`表示没有任何类型`。 当一个函数没有返回值时，你通常会见到其返回值类型是 `void`：

```typescript
/* 表示没有任何类型, 一般用来说明函数的返回值不能是undefined和null之外的值 */
function fn(): void {
  console.log('fn()');
  // return undefined
  // return null
  // return 1 // error
}
```

声明一个 `void` 类型的变量没有什么大用，因为你只能为它赋予 `undefined` 和 `null`：

```typescript
let unusable: void = undefined;
```

## 2.10 object

`object` 表示非原始类型，也就是除 `number`，`string`，`boolean`之外的类型。

使用 `object` 类型，就可以更好的表示像 `Object.create` 这样的 `API`。例如：

```typescript
function fn2(obj: object): object {
  console.log('fn2()', obj);
  return {};
  // return undefined
  // return null
}
console.log(fn2(new String('abc')));
// console.log(fn2('abc') // error
console.log(fn2(String));
```

# 3. 其他相关概念

## 3.1 联合类型

联合类型（Union Types）表示取值可以为多种类型中的一种

```typescript
let c1: number | string = 3;
c1 = 'abc';
// c1 = true // error
```

需求 1: 定义一个函数得到一个数字或字符串值的字符串形式值

```typescript
function toString2(x: number | string): string {
  return x.toString();
}
```

需求 2: 定义一个一个函数得到一个数字或字符串值的长度

```typescript
function getLength(x: number | string) {
  // return x.length // error

  if (x.length) {
    // error
    return x.length;
  } else {
    return x.toString().length;
  }
}
```

## 3.2 类型断言

通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 它没有运行时的影响，只是在编译阶段起作用。 TypeScript 会假设你，程序员，已经进行了必须的检查。

类型断言有两种形式。 其一是“尖括号”语法, 另一个为 `as` 语法

```typescript
/* 
类型断言(Type Assertion): 可以用来手动指定一个值的类型
语法:
    方式一: <类型>值
    方式二: 值 as 类型  tsx中只能用这种方式
*/

/* 需求: 定义一个函数得到一个字符串或者数值数据的长度 */
function getLength(x: number | string) {
  if ((<string>x).length) {
    return (x as string).length;
  } else {
    return x.toString().length;
  }
}
console.log(getLength('abcd'), getLength(1234));
```

## 3.3 类型推断

类型推断: TS 会在没有明确的指定类型的时候推测出一个类型  
有下面 2 种情况: 1. 定义变量时赋值了, 推断为对应的类型. 2. 定义变量时没有赋值, 推断为 any 类型

```typescript
/* 定义变量时赋值了, 推断为对应的类型 */
let b9 = 123; // number
// b9 = 'abc' // error

/* 定义变量时没有赋值, 推断为any类型 */
let b10; // any类型
b10 = 123;
b10 = 'abc';
```

## 3.4 类型别名

```js
/* 
  当使用引用数据类型和联合类型的时候,想要类型复用
    - 普通数据类型:直接写类型,不需要复用
    - 联合类型:类型别名
    - 引用数据类型:
      - 对象:interfase
      - 数组:类型别名
      - 函数:interface

*/
//类型别名
type StringOrNumber = string | number;
const a: StringOrNumber = 1;
const b: StringOrNumber = 1;

//数组类型别名
type StringArr = string[];
const arr1: StringArr = ['hello'];

//函数用接口
interface Fn {
  (x: number, y: number): number;
}
```

# 4. 接口

TypeScript 的核心原则之一是对值所具有的结构进行类型检查。我们使用接口（Interfaces）来定义对象的类型。`接口是对象的状态(属性)和行为(方法)的抽象(描述)`

## 4.1 接口初探

需求: 创建人的对象, 需要对人的属性进行一定的约束

```
id是number类型, 必须有, 只读的
name是string类型, 必须有
age是number类型, 必须有
sex是string类型, 可以没有
```

下面通过一个简单示例来观察接口是如何工作的：

```typescript
/* 
在 TypeScript 中，我们使用接口（Interfaces）来定义对象的类型
接口: 是对象的状态(属性)和行为(方法)的抽象(描述)
接口类型的对象
    多了或者少了属性是不允许的
    可选属性: ?
    只读属性: readonly
*/

/* 
需求: 创建人的对象, 需要对人的属性进行一定的约束
  id是number类型, 必须有, 只读的
  name是string类型, 必须有
  age是number类型, 必须有
  sex是string类型, 可以没有
*/

// 定义人的接口
interface IPerson {
  id: number;
  name: string;
  age: number;
  sex: string;
}

const person1: IPerson = {
  id: 1,
  name: 'tom',
  age: 20,
  sex: '男',
};
```

类型检查器会查看对象内部的属性是否与 IPerson 接口描述一致, 如果不一致就会提示类型错误。

## 4.2 可选属性

接口里的属性不全都是必需的。 有些是只在某些条件下存在，或者根本不存在。

```typescript
interface IPerson {
  id: number;
  name: string;
  age: number;
  sex?: string;
}
```

带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个 `?` 符号。

可选属性的好处之一是可以对可能存在的属性进行预定义，好处之二是可以捕获引用了不存在的属性时的错误。

```typescript
const person2: IPerson = {
  id: 1,
  name: 'tom',
  age: 20,
  // sex: '男' // 可以没有
};
```

## 4.3 只读属性

一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用 `readonly` 来指定只读属性:

```typescript
interface IPerson {
  readonly id: number;
  name: string;
  age: number | string;
  sex?: string;
}
```

一旦赋值后再也不能被改变了。

```typescript
const person2: IPerson = {
  id: 2,
  name: 'tom',
  age: 20,
  // sex: '男' // 可以没有
  // xxx: 12 // error 没有在接口中定义, 不能有
};
person2.id = 2; // error
```

## 4.4readonly vs const

最简单判断该用 `readonly` 还是 `const` 的方法是看要把它做为变量使用还是做为一个属性。 做为变量使用的话用 `const`，若做为属性则使用 `readonly`。

# 5. 函数

函数是 JavaScript 应用程序的基础，它帮助你实现抽象层，模拟类，信息隐藏和模块。在 TypeScript 里，虽然已经支持类，命名空间和模块，但函数仍然是主要的定义行为的地方。TypeScript 为 JavaScript 函数添加了额外的功能，让我们可以更容易地使用。

## 5.1 基本示例

和 JavaScript 一样，TypeScript 函数可以创建有名字的函数和匿名函数。你可以随意选择适合应用程序的方式，不论是定义一系列 API 函数还是只使用一次的函数。

通过下面的例子可以迅速回想起这两种 JavaScript 中的函数：

```javascript
// 命名函数
function add(x, y) {
  return x + y;
}

// 匿名函数
let myAdd = function (x, y) {
  return x + y;
};
```

## 5.2 函数类型

### 5.2.1 为函数定义类型

让我们为上面那个函数添加类型：

```typescript
function add(x: number, y: number): number {
  return x + y;
}

let myAdd = function (x: number, y: number): number {
  return x + y;
};
```

我们可以给每个参数添加类型之后再为函数本身添加返回值类型。TypeScript 能够根据返回语句自动推断出返回值类型。

### 5.2.2 书写完整函数类型

现在我们已经为函数指定了类型，下面让我们写出函数的完整类型。

```typescript
let myAdd2: (x: number, y: number) => number = function (
  x: number,
  y: number,
): number {
  return x + y;
};
```

## 可选参数和默认参数

TypeScript 里传递给一个函数的参数个数必须与函数期望的参数个数一致。

JavaScript 里，每个参数都是可选的，可传可不传。 没传参的时候，它的值就是 `undefined`。 在 TypeScript 里我们可以在参数名旁使用 `?` 实现可选参数的功能。

在 TypeScript 里，我们也可以为参数提供一个默认值当用户没有传递这个参数或传递的值是 `undefined` 时。 它们叫做有默认初始化值的参数。 让我们修改上例，把`firstName` 的默认值设置为 `"A"`。

```typescript
function buildName(firstName: string = 'A', lastName?: string): string {
  if (lastName) {
    return firstName + '-' + lastName;
  } else {
    return firstName;
  }
}

console.log(buildName('C', 'D'));
console.log(buildName('C'));
console.log(buildName());
```

### 剩余参数

必要参数，默认参数和可选参数有个共同点：它们表示某一个参数。 有时，你想同时操作多个参数，或者你并不知道会有多少参数传递进来。 在 JavaScript 里，你可以使用 `...rest` 来访问所有传入的参数。

在 TypeScript 里，你可以把所有参数收集到一个变量里：  
剩余参数会被当做个数不限的可选参数。 可以一个都没有，同样也可以有任意个。 编译器创建参数数组，名字是你在省略号（ `...`）后面给定的名字，你可以在函数体内使用这个数组。

```typescript
function info(x: string, ...args: string[]) {
  console.log(x, args);
}
info('abc', 'c', 'b', 'a');
```

## 函数重载

函数重载: 函数名相同, 而形参不同的多个函数  
在 JS 中, 由于弱类型的特点和形参与实参可以不匹配, 是没有函数重载这一说的
但在 TS 中, 与其它面向对象的语言(如 Java)就存在此语法

```typescript
/* 
函数重载: 函数名相同, 而形参不同的多个函数
需求: 我们有一个add函数，它可以接收2个string类型的参数进行拼接，也可以接收2个number类型的参数进行相加 
*/

// 重载函数声明
function add(x: string, y: string): string;
function add(x: number, y: number): number;

// 定义函数实现
function add(x: string | number, y: string | number): string | number {
  // 在实现上我们要注意严格判断两个参数的类型是否相等，而不能简单的写一个 x + y
  if (typeof x === 'string' && typeof y === 'string') {
    return x + y;
  } else if (typeof x === 'number' && typeof y === 'number') {
    return x + y;
  }
}

console.log(add(1, 2));
console.log(add('a', 'b'));
// console.log(add(1, 'a')) // error
```

# 5. 泛型

指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定具体类型的一种特性。

## 引入

下面创建一个函数, 实现功能: 根据指定的数量 `count` 和数据 `value` , 创建一个包含 `count` 个 `value` 的数组
不用泛型的话，这个函数可能是下面这样：

```typescript
function createArray(value: any, count: number): any[] {
  const arr: any[] = [];
  for (let index = 0; index < count; index++) {
    arr.push(value);
  }
  return arr;
}

const arr1 = createArray(11, 3);
const arr2 = createArray('aa', 3);
console.log(arr1[0].toFixed(), arr2[0].split(''));
```

## 使用函数泛型

```typescript
function createArray2<T>(value: T, count: number) {
  const arr: Array<T> = [];
  for (let index = 0; index < count; index++) {
    arr.push(value);
  }
  return arr;
}
const arr3 = createArray2<number>(11, 3);
console.log(arr3[0].toFixed());
// console.log(arr3[0].split('')) // error
const arr4 = createArray2<string>('aa', 3);
console.log(arr4[0].split(''));
// console.log(arr4[0].toFixed()) // error
```

## 多个泛型参数的函数

一个函数可以定义多个泛型参数

```typescript
function swap<K, V>(a: K, b: V): [K, V] {
  return [a, b];
}
const result = swap<string, number>('abc', 123);
console.log(result[0].length, result[1].toFixed());
```

## 泛型接口

在定义接口时, 为接口中的属性或方法定义泛型类型  
在使用接口时, 再指定具体的泛型类型

```typescript
interface Person<T> {
  name: string;
  age: number;
  info: T;
}

const p: Person<string> = {
  name: 'jack',
  age: 18,
  info: 'abc',
};
```

## 类型别名泛型

```ts
type Undefinable<T> = undefined | T;
const a: Undefinable<number> = 123;
```

# 6. 其它

## 声明文件

当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能

什么是声明语句

假如我们想使用第三方库 jQuery，一种常见的方式是在 html 中通过 `<script>` 标签引入 `jQuery`，然后就可以使用全局变量 `$` 或 `jQuery` 了。

但是在 ts 中，编译器并不知道 $ 或 jQuery 是什么东西

```typescript
/* 
当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能。
声明语句: 如果需要ts对新的语法进行检查, 需要要加载了对应的类型说明代码
  declare var jQuery: (selector: string) => any;
声明文件: 把声明语句放到一个单独的文件（jQuery.d.ts）中, ts会自动解析到项目中所有声明文件
下载声明文件: npm install @types/jquery --save-dev
*/

jQuery('#foo');
// ERROR: Cannot find name 'jQuery'.
```

这时，我们需要使用 declare var 来定义它的类型

```typescript
declare var jQuery: (selector: string) => any;

jQuery('#foo');
```

declare var 并没有真的定义一个变量，只是定义了全局变量 jQuery 的类型，仅仅会用于编译时的检查，在编译结果中会被删除。它编译结果是：

```typescript
jQuery('#foo');
```

一般声明文件都会单独写成一个 `xxx.d.ts` 文件

创建 `01_jQuery.d.ts`, 将声明语句定义其中, TS 编译器会扫描并加载项目中所有的 TS 声明文件

```typescript
declare var jQuery: (selector: string) => any;
```

很多的第三方库都定义了对应的声明文件库, 库文件名一般为 `@types/xxx`, 可以在 `https://www.npmjs.com/package/package` 进行搜索

有的第三库在下载时就会自动下载对应的声明文件库(比如: webpack),有的可能需要单独下载(比如 jQuery/react)

## 内置对象

JavaScript 中有很多内置对象，它们可以直接在 TypeScript 中当做定义好了的类型。

内置对象是指根据标准在全局作用域（Global）上存在的对象。这里的标准是指 ECMAScript 和其他环境（比如 DOM）的标准。

1. ECMAScript 的内置对象

> Boolean  
> Number  
> String  
> Date  
> RegExp  
> Error

```typescript
/* 1. ECMAScript 的内置对象 */
let b: Boolean = new Boolean(1);
let n: Number = new Number(true);
let s: String = new String('abc');
let d: Date = new Date();
let r: RegExp = /^1/;
let e: Error = new Error('error message');
b = true;
// let bb: boolean = new Boolean(2)  // error
```

2. BOM 和 DOM 的内置对象

> Window  
> Document  
> HTMLElement  
> DocumentFragment  
> Event  
> NodeList

```typescript
const div: HTMLElement = document.getElementById('test');
const divs: NodeList = document.querySelectorAll('div');
document.addEventListener('click', (event: MouseEvent) => {
  console.dir(event.target);
});
const fragment: DocumentFragment = document.createDocumentFragment();
```
