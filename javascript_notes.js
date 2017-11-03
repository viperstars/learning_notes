'use strict' // 在 strict 模式下运行的 JavaScript 代码, 强制通过 var 申明变量, 未使用 var 申明变量就使用的, 将导致运行错误

var x = 1;

if (2 > 1){
    console.log('2 > 1')
} else if (2 === 1) {
    console.log('2 == 1')
} else {
    console.log('2 < 1')
}

true && true; // 与运算
true || false; // 或运算
! true // 非运算

1 == '1' // 自动转换数据类型
1 === '1' // 不自动转换数据类型

Math.abs(1 / 3 - (1 - 2 / 3)) < 0.0000001; // 要比较两个浮点数是否相等, 只能计算它们之差的绝对值, 看是否小于某个阈

NaN // Not a number
isNaN(NaN) // 判断 NaN
Infinity // 无限大

// 大多数情况下, 我们都应该用null, undefined 仅仅在判断函数参数是否传递的情况下有用

var person = {
    name: 'Bob',
    age: 20,
    tags: ['js', 'web', 'mobile'],
    city: 'Beijing',
    hascar: true,
    zipcode: null
};
// JavaScript 对象的键都是字符串类型，值可以是任意数据类型
// 要获取一个对象的属性, 我们用对象变量.属性名的方式

var a; // 申明了变量 a, 此时 a 的值为 undefined
var b = 1; // 申明了变量b, 同时给 b 赋值, 此时 b 的值为 1
// 变量可以多次复制, 但是只能用var申明一次

var str1 = `
hehe
hehe
hehe`

var name = 'Kobe'
var str2 = 'Hello, ${name}'

// 不会改变原有字符串的内容，而是返回一个新字符串
// toUpperCase()
// toLowerCase()
// indexOf()
// substring()

var arr = [1, 2, 3.14, 'Hello', null, true];
arr.length; // 6
// 直接给 Array 的 length 赋一个新的值会导致 Array 大小的变化
var arr = [1, 2, 3];
arr.length = 6;
arr; // arr 变为 [1, 2, 3, undefined, undefined, undefined]
arr.length = 2;
arr; // arr 变为 [1, 2]
arr[8] = 'x';
arr; // arr 变为 [1, 2, 3.14, 'Hello', null, true, undefined, 'x']

arr = ['Microsoft', 'Apple', 'Yahoo', 'AOL', 'Excite', 'Oracle'];
// 从索引 2 开始删除 3 个元素, 然后再添加两个元素
arr.splice(2, 3, 'Google', 'Facebook'); // 返回删除的元素 ['Yahoo', 'AOL', 'Excite']
arr; // ['Microsoft', 'Apple', 'Google', 'Facebook', 'Oracle']
// 只删除, 不添加:
arr.splice(2, 2); // ['Google', 'Facebook']
arr; // ['Microsoft', 'Apple', 'Oracle']
// 只添加, 不删除:
arr.splice(2, 0, 'Google', 'Facebook'); // 返回[], 因为没有删除任何元素
arr; // ['Microsoft', 'Apple', 'Google', 'Facebook', 'Oracle']

// concat() 方法并没有修改当前 Array, 而是返回了一个新的 Array, concat 会自动把 Array 拆开, 然后全部添加到新的 Array 里


// 如果属性名包含特殊字符，就必须用''括起来：
var xiaohong = {
    name: '小红',
    'middle-school': 'No.1 Middle School'
};
xiaohong['middle-school']; // ['xxx'] 的方式来访问
// 访问不存在的属性不报错, 而是返回 undefined

// 要判断一个属性是否是 xiaohong 自身拥有而不是继承得到的, 可以用 hasOwnProperty() 方法
xiaohong.hasOwnProperty('name');
xiaoming.hasOwnProperty('toString');

// JavaScript 把 null、undefined、0、NaN 和空字符串 '' 视为 false，其他值一概视为 true

typeof x !== 'number'

var x = 0;
var i;
for (i=1; i<=10000; i++) {
    x = x + i;
}

var arr = ['Apple', 'Google', 'Microsoft'];
var i, x;
for (i=0; i<arr.length; i++) {
    x = arr[i];
    alert(x);
}
// for循环的 3 个条件都是可以省略的, 如果没有退出循环的判断条件, 就必须使用 break 语句退出循环，否则就是死循环

// for循环的一个变体是 for ... in 循环, 它可以把一个对象的所有属性依次循环出来
// 要过滤掉对象继承的属性, 用 hasOwnProperty() 来实现

var o = {
    name: 'Jack',
    age: 20,
    city: 'Beijing'
};

for (var key in o) {
    if (o.hasOwnProperty(key)) {
        alert(key); // 'name', 'age', 'city'
    }
}

var x = 0;
var n = 99;
while (n > 0) {
    x = x + n;
    n = n - 2;
}

var a = ['A', 'B', 'C'];
for (var i in a) {
    alert(i); // '0', '1', '2'
    alert(a[i]); // 'A', 'B', 'C'
}
// for ... in 对 Array 的循环得到的是 String 而不是 Number

var n = 0;
do {
    n = n + 1;
} while (n < 100);

// 用 for ... of 循环遍历集合, 用法如下：

var a = ['A', 'B', 'C'];
var s = new Set(['A', 'B', 'C']);
var m = new Map([[1, 'x'], [2, 'y'], [3, 'z']]);
for (var x of a) { // 遍历 Array
    alert(x);
}
for (var x of s) { // 遍历 Set
    alert(x);
}
for (var x of m) { // 遍历 Map
    alert(x[0] + '=' + x[1]);
}

// for ... in 循环由于历史遗留问题, 它遍历的实际上是对象的属性名称, 一个 Array 数组实际上也是一个对象, 它的每个元素的索引被视为一个属
// 当我们手动给 Array 对象添加了额外的属性后, for ... in 循环将带来意想不到的意外效果

var a = ['A', 'B', 'C'];
a.name = 'Hello';
for (var x in a) {
    alert(x); // '0', '1', '2', 'name'
}
// for ... in 循环将把 name 包括在内，但 Array 的 length 属性却不包括在内
// for ... of 循环则完全修复了这些问题, 它只循环集合本身的元素

var a = ['A', 'B', 'C'];
a.forEach(function (element, index, array) {
    // element: 指向当前元素的值
    // index: 指向当前索引
    // array: 指向Array对象本身
    alert(element);
});

// Set 与 Array 类似，但 Set 没有索引，因此回调函数的前两个参数都是元素本身
// Map 的回调函数参数依次为 value、key 和 map 本身
// 由于 JavaScript 的函数调用不要求参数必须一致，因此可以忽略它们

function abs(x) {
    if (x >= 0) {
        return x;
    } else {
        return -x;
    }
}

var abs = function (x) {
    if (x >= 0) {
        return x;
    } else {
        return -x;
    }
};

// 如果没有 return 语句, 函数执行完毕后也会返回结果, 只是结果为 undefined
// 利用 arguments, 你可以获得调用者传入的所有参数, 所有的参数都保存在 arguments 数组中

function foo(a, b, ...rest) {
    console.log('a = ' + a);
    console.log('b = ' + b);
    console.log(rest);
}

// 传入的参数先绑定 a, b, 多余的参数以数组形式交给变量 rest
// 如果传入的参数连正常定义的参数都没填满, rest 参数会接收一个空数组

// LEGB

//JavaScript的函数定义有个特点，它会先扫描整个函数体的语句，把所有申明的变量"提升"到函数顶部

'use strict';

function foo() {
    var x = 'Hello, ' + y;
    alert(x);
    var y = 'Bob';
}

foo();

// 虽然是 strict 模式，但语句 var x = 'Hello, ' + y
// 并不报错，原因是变量 y 在稍后申明了
// 但是 alert 显示 Hello, undefined, 说明变量 y 的值为 undefined
// 这正是因为 JavaScript 引擎自动提升了变量 y 的声明, 但不会提升变量 y 的赋值
// 我们在函数内部定义变量时, 先在函数内部首先申明所有变量

// JavaScript 默认有一个全局对象 window, 全局作用域的变量实际上被绑定到 window 的一个属性
// JavaScript 实际上只有一个全局作用域
// 任何变量 (函数也视为变量), 如果没有在当前函数作用域中找到
// 就会继续往上查找, 最后如果在全局作用域中也没有找到, 则报 ReferenceError 错误
// 全局变量会绑定到 window 上, 不同的 JavaScript 文件如果使用了相同的全局变量, 或者定义了相同名字的顶层函数, 都会造成命名冲突, 并且很难被发现
// 减少冲突的一个方法是把自己的所有变量和函数全部绑定到一个全局变量中

// 由于JavaScript的变量作用域实际上是函数内部, 我们在 for 循环等语句块中是无法定义具有局部作用域的变量的

function foo() {
    for (var i=0; i<100; i++) {
        //
    }
    i += 100; // 仍然可以引用变量i
}
// 为了解决块级作用域, ES6 引入了新的关键字 let, 用 let 替代 var 可以申明一个块级作用域的变量
// ES6 标准引入了新的关键字 const 来定义常量, const 与 let 都具有块级作用域

// 在一个对象中绑定函数，称为这个对象的方法
var xiaoming = {
    name: '小明',
    birth: 1990,
    age: function () {
        var y = new Date().getFullYear();
        return y - this.birth;
    }
};

// this是一个特殊变量, 它始终指向当前对象, 也就是 xiaoming 这个变量

var xiaoming = {
    name: '小明',
    birth: 1990,
    age: function () {
        var that = this; // 在方法内部一开始就捕获 this
        function getAgeFromBirth() {
            var y = new Date().getFullYear();
            return y - that.birth; // 用 that 而不是 this
        }
        return getAgeFromBirth();
    }
};

// apply 和 call
function getAge() {
    var y = new Date().getFullYear();
    return y - this.birth;
}

var xiaoming = {
    name: '小明',
    birth: 1990,
    age: getAge
};

xiaoming.age(); // 25
getAge.apply(xiaoming, [])
getAge.call(xiaoming, 3, 5, 4)

// 以下两个函数等价
x => x * x

function (x) {
    return x * x;
}
// 包含多条语句, 不能省略 { ... } 和 return
// 参数不是一个, 就需要用括号 () 括起来
// 箭头函数和匿名函数有个明显的区别: 箭头函数内部的 this 是词法作用域, 由上下文确定


// generator 与 Python 的 generator 类似
function* foo(x) {
    yield x + 1;
    yield x + 2;
    return x + 3;
}

// 可以用 next() 方法或循环
for (var x of foo(3)){
    console.log(x);
}

var d = new Date(2015, 5, 19, 20, 15, 30, 123);
// JavaScript 的月份范围用整数表示是 0~11

var re1 = /ABC\-001/;
var re2 = new RegExp('ABC\\-001');

// RegExp对象的 test() 方法用于测试给定的字符串是否符合条件
// 正则匹配默认是贪婪匹配，也就是匹配尽可能多的字符
// 全局匹配可以多次执行 exec() 方法来搜索一个匹配的字符串
// 当我们指定 g 标志后，每次运行 exec() 正则表达式本身会更新 lastIndex 属性，表示上次匹配到的最后索引
// 全局匹配类似搜索，因此不能使用 /^...$/，那样只会最多匹配一次

var xiaoming = {
    name: '小明',
    age: 14,
    gender: true,
    height: 1.65,
    grade: null,
    'middle-school': '\"W3C\" Middle School',
    skills: ['JavaScript', 'Java', 'Python', 'Lisp']
};

// 序列化
JSON.stringify(xiaoming);

// 控制输出
JSON.stringify(xiaoming, ['name', 'skills'], '  ');

// 可以传入回调函数

var xiaoming = {
    name: '小明',
    age: 14,
    gender: true,
    height: 1.65,
    grade: null,
    'middle-school': '\"W3C\" Middle School',
    skills: ['JavaScript', 'Java', 'Python', 'Lisp'],
    toJSON: function () {
        return { // 只输出name和age，并且改变了key：
            'Name': this.name,
            'Age': this.age
        };
    }
};

// 可以给 xiaoming 定义一个 toJSON() 的方法

// 反序列化
JSON.parse('[1,2,3,true]')

// 反序列化可以接受函数

var Student = {
    name: 'Robot',
    height: 1.2,
    run: function () {
        console.log(this.name + ' is running...');
    }
};

var xiaoming = {
    name: '小明'
};

xiaoming.__proto__ = Student; // xiaoming 的原型指向了对象 Student
var s = Object.create(Student) //

function Student(name) {
    this.name = name;
    this.hello = function () {
        alert('Hello, ' + this.name + '!');
    }
}

var s2 = new Student()

function Student2(name) {
    this.name = name;
}

// 共享同一个函数
Student.prototype.hello = function () {
    alert('Hello, ' + this.name + '!');
};

// arr ----> Array.prototype ----> Object.prototype ----> null
// foo ----> Function.prototype ----> Object.prototype ----> null

// PrimaryStudent 构造函数:
function PrimaryStudent(props) {
    Student.call(this, props);
    this.grade = props.grade || 1;
}

// 空函数 F:
function F() {
}

// 把 F的原型指向 Student.prototype:
F.prototype = Student.prototype;

// 把 PrimaryStudent 的原型指向一个新的 F 对象, F 对象的原型正好指向 Student.prototype:
PrimaryStudent.prototype = new F();

// 把 PrimaryStudent 原型的构造函数修复为 PrimaryStudent :
PrimaryStudent.prototype.constructor = PrimaryStudent;

if (s2 instanceof Student) {
    console.log('Yes');
}

function test(resolve, reject) {  //两个参数都是函数
    var timeOut = Math.random() * 2;
    setTimeout(function () {
        if (timeOut < 1) {
            resolve('200 OK'); //执行成功, 调用 resolve 函数
        }
        else {
            reject('timeout in ' + timeOut + ' seconds.');  //执行失败, 调用 reject 函数
        }
    }, timeOut * 1000);
}

new Promise(test).then(function (result) {
    console.log('Success: ' + result);
}).catch(function (reason) {
    console.log('Failure: ' + reason);
});

// Promise.all() 和 Promise.race()