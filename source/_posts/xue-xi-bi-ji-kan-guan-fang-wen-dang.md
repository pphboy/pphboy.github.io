---
title: TypeScript 学习笔记 — 看官方文档
date: 2020-10-25 08:34:00
---

# TYPESCRITP OF GEEK NOTE 
### 以后会更新这个完整度，和理解度，目前这个还不够
ts官方推荐使用let来替代 var

ts 支持 js语法

声明变量

```typescript
let temp:string = '1'
```

声明数组

因为 有泛型，所以会约束数组的类型，这个是真的不错

```typescript
let list:Array<string> = ['1','2','3'];
let list2 = [1,'2','3'];
let list2:any = [1,'2','3'];
let list2:Array<any> = [1,'2','3']; //(没什么用会一种就可以了)
```

解构难以理解，很多时间 不推荐使用

```typescript
let o = {
    a: "foo",
    b: 12,
    c: "bar"
};
let { a, b } = o;

//解构也能用于函数声明。 看以下简单的情况：
type C = { a: string, b?: number }
function f({ a, b }: C): void {
    // ...
}
```

##### 展开

```typescript
let first = [1, 2];
let second = [3, 4];
let bothPlus = [0, ...first, ...second, 5];
//这个三个点是一个语法
console.log(bothPlus)
//[ 0, 1, 2, 3, 4, 5 ]

let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
let search = { ...defaults, food: "rich" };
console.log(search)
//{ food: 'rich', price: '$$', ambiance: 'noisy' }
```

接口，只能多不能少

```typescript
interface LabelledValue {
  label: string;
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}

let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);
//LabelledValue接口就 这种情况的变量是必须存在的
```

接口原有的变量是必须存在的，接口没有的可以增加，接口相当于是一个约束



##### 接口 还有 一种语法，也就是可选属性

```typescript
interface SquareConfig {
  color?: string;
  width?: number;
}
```

上面这种加了问号的"?:"是可选属性，可以 在声明 为函数参数的时候不填写

##### 只读属性

```typescript
interface Point {
    readonly x: number;
    readonly y: number;
}
//你可以通过赋值一个对象字面量来构造一个Point。 赋值后，x和y再也不能被改变了。
```

## `readonly` vs `const`

最简单判断该用`readonly`还是`const`的方法是看要把它做为变量使用还是做为一个属性。 做为变量使用的话用`const`，若做为属性则使用`readonly`。

##### 函数接口 ： 最为致命

```typescript
//声明一个函数接口
interface Student{
    (sname: string,sage:number): string;
}

let pi:Student = function(sname:string,sage:number) {
    return `我是${sname}，我今年${sage}`;
}
console.log(pi("皮皮豪",19));

/*
terminal:
我是皮皮豪，我今年19
*/
```

#### 可索引的类型：总感觉这是要超过JAVA的节奏

```typescript
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];
/*
	通过这个接口，可以约束一个值的索引，可以约束一个数组所对应的类型
 */

interface StringArray {
  [index: number]: Array<number>;
}

let myArray: StringArray;
myArray = [[1,2,3], [1,2,3]];

let myStr: Array<number>= myArray[0];
console.log(myStr)
```

下面这个 没看懂，不过好像意思就是，因为在通过索引取值的时候，这个有可能可以取到Animal，但是，要的是Dog，所以报错，（因为 1 == '1'）所以有时候会取错，然后直接规定为语法错误了（我猜的）

```typescript
class Animal {
    name: string;
}
class Dog extends Animal {
    breed: string;
}

// 错误：使用'string'索引，有时会得到Animal!
interface NotOkay {
    [x: number]: Animal;
    [x: string]: Dog;
}
```

类型细节（我目前发现这个VSCODE太强了，然后TS在vscode中经常出现这个语法错误，且这这个问题我在java在问题是可以生成的，但是在ts中却是语法错误）

接口的索引是的类型是什么类型，其他的属性也要为这个类型，不然是语法错误

```typescript
interface NumberDictionary {
  [index: string]: number;
  length: number;    // 可以，length是number类型
  name: number // 这个我改成了number所以是可行的
}
let MyNumber: NumberDictionary = {
    [0]:1,
    length:123,
    name:123
};
console.log(MyNumber[0]);
//￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥
//interface NumberDictionary {
//  [index: string]: number;
//  length: number;    // 可以，length是number类型
//  name: string       // 错误，`name`的类型与索引类型返回值的类型不匹配
//
//￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥
let MyNumber: NumberDictionary = {
    [3]:3,
    [2]:2,
    [1]:1,
    [4]:4,
    length:123,
    name:111
};
console.log(MyNumber[1]);
console.log(MyNumber.length);
console.log(MyNumber.name);
//后面我发现这个可以定义多个索引键值对相当于，这个索引也是一个属性一样
```

### 类的类型，（实现接口）

这个我只能说和java太像了，虽然js是一个面向对象语言（基于原型），不过我感觉ts是在走向java化

接口定义的属性是需要被实现类实现或定义的

```typescript
interface Person{ 
    name:string;
    age:number;
}

class Student implements Person{
    constructor(name:string,age:number){
        this.name = name;
        this.age = age
    }
    name:string ;
    age:number;
    //这个得按照语法规则 来
    show():void{
        console.log(`我的名字是:${this.name}，我的年龄是${this.age}`);
    };
}
let stu = new Student("皮皮豪",10);
stu.show();
```

## **类静态部分与实例部分的区别**

**当你操作类和接口的时候，你要知道类是具有两个类型的：静态部分的类型和实例的类型。 你会注意到，当你用构造器签名去定义一个接口并试图定义一个类去实现这个接口时会得到一个错误：**

```typescript
interface ClockConstructor {
    new (hour: number, minute: number);
}

class Clock implements ClockConstructor {
    currentTime: Date;
    constructor(h: number, m: number) { }
}
```

**这里因为当一个类实现了一个接口时，只对其实例部分进行类型检查。 constructor存在于类的静态部分，所以不在检查的范围内。**(这是官方原话)

目前还没有探索到ts底层实现，所以无法解释，只能说是学习

### 继承接口

一个接口可以继承多个接口，反正就是PLUS的PLUS

```typescript
interface Person{
    name:string;
    age:number;
    hack();
}

interface Student extends Person{
    stuNumber:number;
    school:string;
}

let student = <Student>{};
student.age = 12;
student.name = "小皮";
student.hack = ()=>{
    console.log("Hello hack");
};
student.school = "High School";
console.log(student);

//{ age: 12, name: '小皮', hack: [Function], school: 'High School' }
```

### 混合类型

这直接把一个声明了一个又是函数，又是对象的接口

细节：给eater赋值的function内部的this是global（全局对象），但是在给close赋值的function属性中，this是指向的是eater的food属性（显然我不明白为什么。。。）

```typescript
interface Eat{
    (start: string):string;
    food:string;
    close():void;
}

function getEat(): Eat{
    let eater = <Eat>function (start: string){
        console.log(this);
        eater.food = start;
    };
    eater.close = function(){ console.log(this.food+"啥也没吃");};
    return eater;
}
let eat = getEat();
eat("什么都没有");
eat.close();

/* 这是打印的的结果
Object [global] {
  global: [Circular],
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] {
    [Symbol(nodejs.util.promisify.custom)]: [Function]
  },
  queueMicrotask: [Function: queueMicrotask],
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function: setImmediate] {
    [Symbol(nodejs.util.promisify.custom)]: [Function]
  }
}
什么都没有啥也没吃
*/
```

### 类  

这里我要声明一下，在内部成员之间，访问类的属性或成员的时候，一定要加this，好像在ts之中这是一种语法，不过，加了之后代码的逻辑会非常的清晰

```typescript
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter("world");
```

 如果你使用过C#或Java，你会对这种语法非常熟悉。 我们声明一个`Greeter`类。这个类有3个成员：一个叫做`greeting`的属性，一个构造函数和一个`greet

#### 万变不离其宗

调用本身的属性和成员时，使用的是this

调用父类的属性和成员时，使用的是super，调用父类的构造方法，super()，但是this()却是报错的，所以ts与java还是有很多的差异

```typescript
class Animal {
    name: string;
    constructor(theName: string) { this.name = theName; }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

class Snake extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}

class Horse extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);
```

  按理来说，在实现子类的构造方法的时候是需要调用一次super()的，这个在ts中是一个标准的语法了，也就是一个子类的构造方法必须调用父类的构造方法



**派生类的构造函数必须包含 "super" 调用。ts(2377)**

```typescript
class Father{
    name:string;
    age: number;
    constructor(){
        console.log(`我是超类${this.name},我的年龄是${this.age}`);
    }
}

class Child extends Father{
    iphone:number;
    constructor() { //这个直接是语法错误:
    }
}
//下面的为请为正确
class Father{
    name:string;
    age: number;
    constructor(){
        //这里我们使用了this来引用本类之中的属性，且，最好不要使用name为变量名，总结中会讲
        console.log(`我是超类${this.name},我的年龄是${this.age}`);
    }
}

// 加分号是一个好习惯
class Child extends Father{
    iphone:number;
    constructor() { 
        super();
    }
}

```

 与前一个例子的不同点是，派生类包含了一个构造函数，它*必须*调用`super()`，它会执行基类的构造函数。 而且，在构造函数里访问`this`的属性之前，我们*一定*要调用`super()`。 这个是TypeScript强制执行的一条重要规则。 

##### 重写

重写和重载一定要分开，重写是类与类之间，重载是属性与属性之间

```typescript
class Animal {
    name: string;
    constructor(theName: string) { this.name = theName; }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

class Snake extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}

class Horse extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);
```

### 公共，私有与受保护的修饰符

使用访问权限修饰符，会让你的代码更加规范

在java之中，是有严格要求使用修饰符的（别杠）

public private protected 

private是在外部不能访问

**而protected在外部也不能访问，但是在子类之中却可以访问其属性**

#### 只读属性

跟java中的final一样

只读属性必须在声明时或构造函数中被初始化在ts之中

```typescript
class Father{
    readonly name:string;
    readonly id:string = '皮';
    age: number;
    constructor(){
        console.log(`我是超类${this.name},我的年龄是${this.age}`);
    }
}

console.log(new Father().id)

//与这个 常量的差异在于，无法直接使用类名调用
```

#### 存取器（getter/setter)

下面这个版本里，我们先检查用户密码是否正确，然后再允许其修改员工信息。 我们把对`fullName`的直接访问改成了可以检查密码的`set`方法。 我们也加了一个`get`方法，让上面的例子仍然可以工作。

```typescript
let passcode = "secret passcode";

class Employee {
    private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (passcode && passcode == "secret passcode") {
            this._fullName = newName;
        }
        else {
            console.log("Error: Unauthorized update of employee!");
        }
    }
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    alert(employee.fullName);
}
```

##### 注意

 首先，存取器要求你将编译器设置为输出ECMAScript 5或更高。 不支持降级到ECMAScript 3。 其次，只带有`get`不带有`set`的存取器自动被推断为`readonly`。 这在从代码生成`.d.ts`文件时是有帮助的，因为利用这个属性的用户会看到不允许够改变它的值。 



#### 静态属性 万变不离其宗 static

静态属性可以使用类名直接调用该类的静态属性

这里并不局限于 类，而是所有的静态属性

```typescript
class TestStatic{
    static sname:string = '你的名字';
}

console.log(TestStatic.sname);
```

### 抽象类

```typescript
abstract class Department {

    constructor(public name: string) {
    }

    printName(): void {
        console.log('Department name: ' + this.name);
    }

    abstract printMeeting(): void; // 必须在派生类中实现
}

class AccountingDepartment extends Department {

    constructor() {
        super('Accounting and Auditing'); // 在派生类的构造函数中必须调用 super()
    }

    printMeeting(): void {
        console.log('The Accounting Department meets each Monday at 10am.');
    }

    generateReports(): void {
        console.log('Generating accounting reports...');
    }
}

let department: Department; // 允许创建一个对抽象类型的引用
department = new Department(); // 错误: 不能创建一个抽象类的实例
department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
department.printName();
department.printMeeting();
department.generateReports(); // 错误: 方法在声明的抽象类中不存在
```

## 高级技巧

看不懂就别看了，我也看不懂这有什么高级的

```typescript
class Greeter {
    static standardGreeting = "Hello, there";
    greeting: string;
    greet() {
        if (this.greeting) {
            return "Hello, " + this.greeting;
        }
        else {
            return Greeter.standardGreeting;
        }
    }
}

let greeter1: Greeter;
greeter1 = new Greeter();
console.log(greeter1.greet());

let greeterMaker: typeof Greeter = Greeter;
greeterMaker.standardGreeting = "Hey there!";

let greeter2: Greeter = new greeterMaker();
console.log(greeter2.greet());
```



## 把类当做接口使用

如上一节里所讲的，类定义会创建两个东西：类的实例类型和一个构造函数。 因为类可以创建出类型，所以你能够在允许使用接口的地方使用类。

```
class Point {
    x: number;
    y: number;
}

interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};
```

#### 函数

TypeScript里我们可以在参数名旁使用`?`实现可选参数的功能。 比如，我们想让last name是可选的：

```typescript
function buildName(firstName: string, lastName?: string) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}

let result1 = buildName("Bob");  // works correctly now
let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result3 = buildName("Bob", "Adams");  // ah, just right
```

可选参数要放在最后面

## `this`参数

不幸的是，`this.suits[pickedSuit]`的类型依旧为`any`。 这是因为`this`来自对象字面量里的函数表达式。 修改的方法是，提供一个显式的`this`参数。 `this`参数是个假的参数，它出现在参数列表的最前面：

```typescript
function f(this: void) {
    // make sure `this` is unusable in this standalone function
}
```

刚刚小有浮躁，现在好了，慢慢学习

### 泛型

ts还是抄了js的绕字经

```typescript
class BeeLing{
    constructor (){
        console.log("I AM BEELING");
    }
}

function create<T>(c: {new() : T;}):T{
    return new c();
}

let temp = create<BeeLing>(BeeLing);
console.log(temp)
```

### 类型推论

TypeScript里，在有些没有明确指出类型的地方，类型推论会帮助提供类型。

上下文类型

##### 上下文类型 没看懂类型....

TypeScript类型推论也可能按照相反的方向进行。 这被叫做“按上下文归类”。按上下文归类会发生在表达式的类型与所处的位置相关时。比如：

```typescript
window.onmousedown = function(mouseEvent) {
    console.log(mouseEvent.button);  //<- Error
};
```

这个例子会得到一个类型错误，TypeScript类型检查器使用`Window.onmousedown`函数的类型来推断右边函数表达式的类型。 因此，就能推断出`mouseEvent`参数的类型了。 如果函数表达式不是在上下文类型的位置，`mouseEvent`参数的类型需要指定为`any`，这样也不会报错了。

如果上下文类型表达式包含了明确的类型信息，上下文的类型被忽略。 重写上面的例子：

```typescript
window.onmousedown = function(mouseEvent: any) {
    console.log(mouseEvent.button);  //<- Now, no error is given
};
```

这个函数表达式有明确的参数类型注解，上下文类型被忽略。 这样的话就不报错了，因为这里不会使用到上下文类型。

上下文归类会在很多情况下使用到。 通常包含函数的参数，赋值表达式的右边，类型断言，对象成员和数组字面量和返回值语句。 上下文类型也会做为最佳通用类型的候选类型。比如：

```typescript
function createZoo(): Animal[] {
    return [new Rhino(), new Elephant(), new Snake()];
}
```

这个例子里，最佳通用类型有4个候选者：`Animal`，`Rhino`，`Elephant`和`Snake`。 当然，`Animal`会被做为最佳通用类型。



小结：上下文类型就是取一个类型为整个式子的类型，如果式子开头有标有类型注解，那么上下文类型将不会被使用。

## 类型兼容性

相对于对象而言：有继承和实现才有兼容可言

#### 枚举

枚举如果未赋特定的值，是会有一个默认的数值，这个值可以理解为索引

枚举类型与数字类型兼容，并且数字类型与枚举类型兼容。不同枚举类型之间是不兼容的。比如，

```typescript
enum Status { Ready, Waiting };
enum Color { Red, Blue, Green };
console.log(Status)
console.log(Color)
console.log(Color.Blue)
/* 打印的结果如下：
{ '0': 'Ready', '1': 'Waiting', Ready: 0, Waiting: 1 }
{ '0': 'Red', '1': 'Blue', '2': 'Green', Red: 0, Blue: 1, Green: 2}
1
 */
```

## 类

类与接口的差异：类有静态部分和实例部分的类型。

比较两个类型时，只有的对象的成员为被比较。静态成员和构造函数不在比较的范围内。

##### 类的私有成员

私有成员会影响兼容性的判断。当类的实例用来检查兼容时，如果目标类型包含一个私有成员，那么原类型必须包含来自同一个类的这个私有成员。这允许子类赋值给败类，但是不能赋值其它有同样类型的类。

##### 泛型

```typescript
interface Empty<T> {
}
let x: Empty<number>;
let y: Empty<string>;

x = y;  // okay, y matches structure of x
```

对于一个没有指定类型的参数，会把所有的泛型参数当成any比较。然后用结果类型进行比较，就像上面第一个例子。

## 子类型与赋值

子类型与赋值，它们的不同点在于，赋值扩展了子类型兼容，允许给any赋值或从any取值和允许数字赋值给枚举类型或枚举类型赋值给数字。  

语言里的不同地方分别使用了它们之中的机制，实际上，**类型兼容性是由赋值兼容性**来控制的，即便在使用implements和extends语句也不例外。



### 高级类型

#### 交叉类型

交叉有点成员共用的感觉

```typescript
function extend<T, U>(first: T, second: U): T & U {
    let result = <T & U>{};
    for (let id in first) {
        (<any>result)[id] = (<any>first)[id];
    }
    for (let id in second) {
        if (!result.hasOwnProperty(id)) {
            (<any>result)[id] = (<any>second)[id];
        }
    }
    return result;
}

class Person {
    constructor(public name: string) { }
}
interface Loggable {
    log(): void;
}
class ConsoleLogger implements Loggable {
    log() {
        // ...
    }
}
var jim = extend(new Person("Jim"), new ConsoleLogger());
var n = jim.name;
jim.log();
```

### 联合类型

下面这个代码是报错了，即便注释 了pet.swim()还是报错，我不知道为什么，以后 来解

```typescript
#如果一个值是联合类型，我们只能访问此联合类型的所有类型里共有的成员。
#如果你能看懂下面的代码说明你已经明白什么是联合类型了，下面这个代码语法错误了，具体我也没有看出一个具体来
interface Bird {
    fly();
    layEggs();
}

interface Fish {
    swim();
    layEggs();
}

function getSmallPet(): Fish | Bird {
    let pet:Fish|Bird = {
        swim():void{
            console.log("SWIM");
        },
        fly():void{
            console.log("FLY")
        },
        layEggs():void{
            console.log("下蛋")
        },
    };
    return pet;
}

let pet = getSmallPet();
console.log(typeof pet)
pet.layEggs(); // okay
pet.swim();    // errors
```

上面的问题目前已经解决，是因为没有返回值类型，所以才会报错，目前已发现问题

### 类型保护与区分类型

```typescript
// 上面的代码是无法运行的，因为这个成员是不能访问的，是一个语法错误，报的是error，所以，需要使用断言来处理这个
let pet = getSamllPet();
if((<Fish>pet).swim){
    (<Fish>pet).swim();
}else{
    (<Bird>pet).fly();
}
```

### 用户自定义的类型保护

TypeScript里的类型保护机制让它成为了现实，类型保护就是一些表达式，它们会在运行时检查以确保在某个作用域的类型。要定义一个类型保护，我们只要简单地定义一个函数，它的返回值是一个类型谓词：

```typescript
function isFish(pet: Fish | Bird): pet is Fish {
    return (<Fish>pet).swim !== undefined;
}
```

 在这个例子里，`pet is Fish`就是类型谓词。 谓词为`parameterName is Type`这种形式，`parameterName`必须是来自于当前函数签名里的一个参数名。 

每当使用一些变量调用`isFish`时，TypeScript会将变量缩减为那个具体的类型，只要这个类型与变量的原始类型是兼容的。

```typescript
// 'swim' 和 'fly' 调用都没有问题了

if (isFish(pet)) {
    pet.swim();
}
else {
    pet.fly();
}
```

### `typeof`类型保护

现在我们回过头来看看怎么使用联合类型书写`padLeft`代码。 我们可以像下面这样利用类型断言来写：

```typescript
function isNumber(x: any): x is number {
    return typeof x === "number";
}

function isString(x: any): x is string {
    return typeof x === "string";
}

function padLeft(value: string, padding: string | number) {
    if (isNumber(padding)) {
        return Array(padding + 1).join(" ") + value;
    }
    if (isString(padding)) {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}
```

然而，必须要定义一个函数来判断类型是否是原始类型，这太痛苦了。 幸运的是，现在我们不必将`typeof x === "number"`抽象成一个函数，因为TypeScript可以将它识别为一个类型保护。 也就是说我们可以直接在代码里检查类型了。

```typescript
function padLeft(value: string, padding: string | number) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}
```

这些*`typeof`类型保护*只有两种形式能被识别：`typeof v === "typename"`和`typeof v !== "typename"`，`"typename"`必须是`"number"`，`"string"`，`"boolean"`或`"symbol"`。 但是TypeScript并不会阻止你与其它字符串比较，语言不会把那些表达式识别为类型保护。

---------------------

上面这个是官方的原文，感觉还是写的简单易懂，不错！！！

### `instanceof`类型保护

```typescript
interface Padder {
    getPaddingString(): string
}

class SpaceRepeatingPadder implements Padder {
    constructor(private numSpaces: number) { }
    getPaddingString() {
        return Array(this.numSpaces + 1).join(" ");
    }
}

class StringPadder implements Padder {
    constructor(private value: string) { }
    getPaddingString() {
        return this.value;
    }
}

function getRandomPadder() {
    return Math.random() < 0.5 ?
        new SpaceRepeatingPadder(4) :
        new StringPadder("  ");
}

// 类型为SpaceRepeatingPadder | StringPadder
let padder: Padder = getRandomPadder();

console.log(padder instanceof SpaceRepeatingPadder)
if (padder instanceof SpaceRepeatingPadder) {
    padder; // 类型细化为'SpaceRepeatingPadder'
}
console.log(padder instanceof StringPadder)
if (padder instanceof StringPadder) {
    padder; // 类型细化为'StringPadder'
}
```

### 可以为null的类型



### 类型别名

起别名不会新建一个类型，它创建 了一个新名字来引用那个类型，给原始类型起别名通常没什么用，尽管可以他为文档的一程形式使用。

```typescript
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    }
    else {
        return n();
    }
}
```

同接口一样，类型别名也可以是泛型 - 我们可以添加类型参数并且在别名声明的右侧传入：

```typescript
type Container<T> = { value: T };
```

我们也可以使用类型别名来在属性里引用自己：

```typescript
type Tree<T> = {
    value: T;
    left: Tree<T>;
    right: Tree<T>;
}
```

与交叉类型一起使用，我们可以创建出一些十分稀奇古怪的类型。

```typescript
type LinkedList<T> = T & { next: LinkedList<T> };

interface Person {
    name: string;
}

var people: LinkedList<Person>;
var s = people.name;
var s = people.next.name;
var s = people.next.next.name;
var s = people.next.next.next.name;
```

### 可辨识联合（Discriminated Unions）

```typescript
interface Square {
    kind: "square";
    size: number;
}
interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}
interface Circle {
    kind: "circle";
    radius: number;
}
//下面是联合的语法 联合是一种类型，可以联合几个类型，然后起一个别名
type Shape = Square | Rectangle | Circle;
//现在我们使用可辨识联合:
function area(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
    }
}
```

### 完整性检查

```typescript
function assertNever(x: never): never {
    throw new Error("Unexpected object: " + x);
}
function area(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
        default: return assertNever(s); // error here if there are missing cases
    }
}
```

### 多态的this类型

```typescript
//这是我写的代码
class NamePlus{
    public constructor(protected name:string = ''){
        console.log("name : "+this.name);
    }

    public add(nsg: string): this{
        this.name += nsg;
        console.log("name : "+this.name);
        return this;
    }
}

let minename:NamePlus = new NamePlus("皮皮").add("豪");
console.log(minename)
```

因为这个BasicCalculator，的方法使用的return this;所以，在子类 之中，可以直接使用链式调用这个方法，来控制其属性的值的变化，

```typescript
class BasicCalculator {
    public constructor(protected value: number = 0) { }
    public currentValue(): number {
        return this.value;
    }
    public add(operand: number): this {
        this.value += operand;
        return this;
    }
    public multiply(operand: number): this {
        this.value *= operand;
        return this;
    }
    // ... other operations go here ...
}

class ScientificCalculator extends BasicCalculator {
    public constructor(value = 0) {
        super(value);
    }
    public sin() {
        this.value = Math.sin(this.value);
        return this;
    }
    // ... other operations go here ...
}

let v = new ScientificCalculator(2)
        .multiply(5)
        .sin()
        .add(1)
        .currentValue();
```

### 索引类型

其实这个在前面已经遇到过很多次了，在这里 就做一下小结吧

下面的这个name为索引，可能下面的['name']就是访问值的索引的语法

在pluck中规定了这个names变量的类型为K

K extends keyof T，判断K索引是不是T中的索引，如果不是则无法获取值

实质的 keyof T 可以看成 'age' | 'name'

是一个联合类型，如果一个联合类型中没有该属性，则会报错

```typescript
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map(n => o[n]);
}

// 
interface Person {
    name: string;
    age: number;
}
let person: Person = {
    name: 'Jarid',
    age: 35
};
let strings: string[] = pluck(person, ['name']); // ok, string[]
```

```typescript
interface Student{
    name: string;
    age: number;
}

let stu:Student ={
    name: '皮皮豪',
    age: 19,
}

function test<T,K extends keyof T>(cs: T,name : K){
    console.log(cs[name]);
}
test(stu,'name');
```

### 映射类型

```typescript
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
}
type Partial<T> = {
    [P in keyof T]?: T[P];
}

type PersonPartial = Partial<Person>;
type ReadonlyPerson = Readonly<Person>;
//人都看傻系列
type Keys = 'option1' | 'option2';
type Flags = { [K in Keys]: boolean };
```

说实话，看这一章的时候有些浮躁，没怎么看进去

加油吧，期待二刷！

## Symbols

#### 介绍

自ECMAScript 2015起，`symbol`成为了一种新的原生类型，就像`number`和`string`一样。

`symbol`类型的值是通过`Symbol`构造函数创建的。

```typescript
let sym = Symbol();

let obj = {
    [sym]: "value"
};

console.log(obj[sym]); // "value"
```

## Iterators 和 Generators

```typescript
let someArray = [1,'String',false];

// for..of遍历的是值
for (const entry of someArray) {
    console.log(entry)
}

let list = [4,5,6];
// for ..in遍历的是数组
for(let i in list){
    console.log(i)
}
```

 另一个区别是`for..in`可以操作任何对象；它提供了查看对象属性的一种方法。 但是`for..of`关注于迭代对象的值。内置对象`Map`和`Set`已经实现了`Symbol.iterator`方法，让我们可以访问它们保存的值。 

#### 代码生成

当生成目标为ES5或ES3，迭代器只允许在`Array`类型上使用。 在非数组值上使用`for..of`语句会得到一个错误，就算这些非数组值已经实现了`Symbol.iterator`属性。

编译器会生成一个简单的`for`循环做为`for..of`循环，比如：

```typescript
let numbers = [1, 2, 3];
for (let num of numbers) {
    console.log(num);
}
```

生成的代码为：

```typescript
var numbers = [1, 2, 3];
for (var _i = 0; _i < numbers.length; _i++) {
    var num = numbers[_i];
    console.log(num);
}
```

#### 目标为 ECMAScript 2015 或更高

当目标为兼容ECMAScipt 2015的引擎时，编译器会生成相应引擎的`for..of`内置迭代器实现方式。

## 模块（未学会） ！已学会

#### 介绍

和js的模块一样

模块使用模块加载器去导入其它的模块。 在运行时，模块加载器的作用是在执行此模块代码前去查找并执行这个模块的所有依赖。 大家最熟知的JavaScript模块加载器是服务于Node.js的[CommonJS](https://en.wikipedia.org/wiki/CommonJS)和服务于Web应用的[Require.js](http://requirejs.org/)。

TypeScript与ECMAScript 2015一样，任何包含顶级`import`或者`export`的文件都被当成一个模块。

```typescript
export class SomeType { /* ... */ }
export function someFunc() { /* ... */ }

export class Dog { ... }
export class Cat { ... }
export class Tree { ... }
export class Flower { ... }

import { Calculator, test } from  "./Calculator";

```

* 被export的属性不管是类还是方法，都可以 在外部通过模块名直接引入
* 下面是例子

```typescript
// export namespace A{
namespace A{
    export class Dog{
        constructor(private food:string){
        }

        eat():void{
            console.log(`Dog eat ${this.food}`);
        }
    }

    export function show(){
        console.log("Dog of namespace A");
    }
}

// export namespace B{
namespace B{
    export class Cat{
        constructor(private food:string){
        }

        eat():void{
            console.log(`Cat eat ${this.food}`);
        }
    }

    export function show(){
        console.log("Cat of namespace A");
    }
}
export{
    A,B
}



```

```typescript
import {A,B} from './Aminal';

let a = new A.Dog("SHIT");
a.eat();
A.show();


let b = new B.Cat("猫粮");
b.eat();
B.show();
```





## 命名空间（未学会）！已学会，答案在上面 



```typescript
// 使用下面这个方法引用命名命名空间，则无需将Aminal内的namespace使用export暴露
/// <reference path="Aminal.ts"/>
let a = new A.Dog("SHIT");
a.eat();
A.show();


let b = new B.Cat("猫粮");
b.eat();
B.show();
```

### 官方的对于模块和命名空间的提示

 再次重申，不应该对模块使用命名空间，使用命名空间是为了提供逻辑分组和避免命名冲突。 模块文件本身已经是一个逻辑分组，并且它的名字是由导入这个模块的代码指定，所以没有必要为导出的对象增加额外的模块层。 

也就是说，命名空间就是用来分组代码，而模块则是为了将代码抽出成为单独可利用的模块，

也就是说，模块就是模块，命名空间内写模块，就是不应该的

### 声明合并

声明合并是指编译器将针对同一个名字的两个独立的声明合并为单一声明，合并后的声明同时拥有原先两个声明的特性。任何数量的声明都可被合并；不局限于两个声明。

##### 合并接口

```typescript
interface Cloner {
    clone(animal: Animal): Animal;
}

interface Cloner {
    clone(animal: Sheep): Sheep;
}

interface Cloner {
    clone(animal: Dog): Dog;
    clone(animal: Cat): Cat;
}
```

这三个接口合并成一个声明：

```typescript
interface Cloner {
    clone(animal: Dog): Dog;
    clone(animal: Cat): Cat;
    clone(animal: Sheep): Sheep;
    clone(animal: Animal): Animal;
}
```

```typescript
interface Cloner {
    clone(animal: Dog): Dog;
    clone(animal: Cat): Cat;
    clone(animal: Sheep): Sheep;
    clone(animal: Animal): Animal;
}
```

注意每组接口里的声明顺序保持不变，但各组接口之间的顺序是后来的接口重载出现在靠前的位置。

#### 合并命名空间

`Animals`声明合并示例：

```typescript
namespace Animals {
    export class Zebra { }
}

namespace Animals {
    export interface Legged { numberOfLegs: number; }
    export class Dog { }
}
```

等同于：

```typescript
namespace Animals {
    export interface Legged { numberOfLegs: number; }

    export class Zebra { }
    export class Dog { }
}
```

注意：函数命名相同等于重载，的抽象体的命名相同就会自动合并

 目前，类不能与其它类或变量合并。 想要了解如何模仿类的合并，请参考[TypeScript的混入](https://typescript.bootcss.com/Mixins.md)。 

## JSX

 [JSX](https://facebook.github.io/jsx/)是一种嵌入式的类似XML的语法。 它可以被转换成合法的JavaScript，尽管转换的语义是依据不同的实现而定的。 JSX因[React](http://facebook.github.io/react/)框架而流行，但是也被其它应用所使用。 TypeScript支持内嵌，类型检查和将JSX直接编译为JavaScript。 

## 装饰器

```typescript
function f() {
    console.log("f(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("f(): called");
    }
}

function g() {
    console.log("g(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("g(): called");
    }
}

class C {
    @f()
    @g()
    method(){
    }
}
/** 在这其中 method报错了，但是还是编译成功
打印结果
f(): evaluated
g(): evaluated
g(): called
f(): called
*/
```

### 装饰器求值：类中不同声明上的装饰器将近以下规定的顺序应用：

1. 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个实例成员。
2. 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个静态成员。
3. 参数装饰器应用到构造函数。
4. 类装饰应用到类。

### 类装饰器

*类装饰器*在类声明之前被声明（紧靠着类声明）。 类装饰器应用于类构造函数，可以用来监视，修改或替换类定义。 类装饰器不能用在声明文件中(`.d.ts`)，也不能用在任何外部上下文中（比如`declare`的类）。



-----------------------

装饰器：装饰器是一种特殊类型的声明，它能够被附加到类声明，方法，属性或参数上，可以修改类的行为。

通俗的讲装饰哭就是一个方法，可以流入到类、方法、属性参数上来扩展类、属性、方法、参数的功能。

常见的装饰器有：类装饰器、属性装饰器、方法街道器、参数装饰器

装饰器的：普通装饰器（无法传参）、装饰器工厂（可传参）

装饰器的写法：普通装饰器（无法传参）、装饰器工厂（可传参）

装饰器是过去几年中js最大的成就安安静静，已是Es7的标准特性之一。



##### 装饰器的执行顺序

属性 > 方法 > 方法参数 > 类

如果多个同样的装饰器，它会先执行后面的

## 混入(mixin)

把两个或多个类当作接口来使用，然后使用特定的方法将属性遍历添加

```typescript
function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
```



## 三斜线指令（细节 太多 用时需要看文档 ）

三斜线只能放在文件的顶端，前面可以有注释，也可以有其它 的三斜线指令

##### 报错

如何引用了不存在的文件，三斜线会自己报错（感觉算语法错误）

## JavaScript文件里的类型检查

看官方文档，主要是一些细节，这个主要是过一下，注意一下就可以了 


# 函数重载

## 顺序

*不要*把一般的重载放在精确的重载前面：

```
/* 错误 */
declare function fn(x: any): any;
declare function fn(x: HTMLElement): number;
declare function fn(x: HTMLDivElement): string;

var myElem: HTMLDivElement;
var x = fn(myElem); // x: any, wat?
```

*应该*排序重载令精确的排在一般的之前：

```
/* OK */
declare function fn(x: HTMLDivElement): string;
declare function fn(x: HTMLElement): number;
declare function fn(x: any): any;

var myElem: HTMLDivElement;
var x = fn(myElem); // x: string, :)
```

*为什么*：TypeScript会选择*第一个匹配到的重载*当解析函数调用的时候。 当前面的重载比后面的“普通”，那么后面的被隐藏了不会被调用。

## 使用可选参数

*不要*为仅在末尾参数不同时写不同的重载：

```
/* 错误 */
interface Example {
    diff(one: string): number;
    diff(one: string, two: string): number;
    diff(one: string, two: string, three: boolean): number;
}
```

*应该*尽可能使用可选参数：

```
/* OK */
interface Example {
    diff(one: string, two?: string, three?: boolean): number;
}
```

注意这在所有重载都有相同类型的返回值时会不好用。