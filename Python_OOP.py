# -*- coding:utf-8 -*-

import time
from functools import wraps

class C1:
    """旧式类"""
    def __init__(self):
        pass

class C2(object):
    """新式类
       1，修改了查找方式
       2，解决了钻石继承，父类方法调用多次的问题
       3，新增 __slots__, __getattribute__
       4，新增描述符 __get__, __set__, 和 __delete__ 方法
    """
    a = 1 # 类属性
    b = 2
    instance = None

    def __new__(cls, *args, **kwargs): # __new__ 方法，决定是否调用 __init__ 方法
        if C2.instance is None:
            C2.instance = super(C2, cls).__new__(cls) # 返回 __init__ 方法实例化后的对象
            # super 返回 class 的 mro 序列，依次调用父类的方法，并保证只调用一次
        return C2.instance

    def __init__(self): # 实例化方法
        self._id = id(self)
        print 'id: {0} created.'.format(self._id)

    def __del__(self): # 析构方法
        print 'id: {0} destroied.'.format(self._id)

    def __get_id(self):
        return self._id

    def get_id(self):
        return self.__get_id()

    def get_dict(self):
        return self.__dict__ # 对象的属性和方法保存在 __dict__ 中

    def print_name(self): # abstract 方法，子类实现
        raise NotImplementedError # NotImplementedError 为异常类，可以被 try/catch 捕捉到
        # NotImplemented 由 __eq__(),  __lt__(), __add__(), __rsub__() 等几类方法返回，表示需要尝试其他方法


class Property(object): # Property 类
    """
    如果一个对象同时定义了 __get__() 和 __set__(), 它叫做资料描述器 (data descriptor)
    仅定义了 __get__() 的描述器叫非资料描述器 (non-data descriptor)
    """

    def __init__(self, value):
        self.value = value

    def __get__(self, instance, owner):
        """通过 __get__ 方法拦截属性访问"""
        return self.value

    def __set__(self, instance, value):
        """通过 __set__ 方法拦截属性设置"""
        if value < 0:
            # raise AttributeError
            print 'should raise a AttributeError'
        else:
            self.value = value

class C3(object):

    def __init__(self, a, b, c):
        self._data = dict()
        self.a = a
        self.b = b
        self._c = c

    @property # property 装饰器，增加对单个属性访问和设置的拦截
    def c(self):
        return self._c

    @c.setter
    def c(self, a):
        if isinstance(a, int):
            self._c = a
        else:
            # raise AttributeError
            print 'should raise a AttributeError'


class C4(object):

    sum = Property('sum') # 设置类属性为 Property 实例
    # 为什么定义为类属性，原因见 156 行

    def __init__(self, a, b):
        self._data = dict()
        self.a = a
        self.b = b
        self.sum = 5


class C5(object):
    def __init__(self, a, b):
        self._dict = dict()
        self.a = a
        self.b = b

    def __getattr__(self, name):  # 拦截不存在属性的访问
        return None

    def __setattr__(self, name, value): # 拦截属性设置
        if name != "_time":
            self._dict["{}_settime".format(name)] = time.time()
        object.__setattr__(self, name, value) # 调用超类的 __setattr__ 方法避免循环

    def __getattribute__(self, name): # 拦截所有属性访问
        if name != "_time":
            self._dict["{}_gettime".format(name)] = time.time()
        return object.__getattribute__(self, name) # 调用超类的 __getattribute__ 方法避免循环

class C6(type):
    """
    元类继承自 type
    可以在创建类之前，对类名，父类列和属性字典进行操作后再创建类
    """
    def __new__(cls, name, bases, dct):
        # 对类名，父类列表和属性字典进行操作
        name += 'FromMetaClass'
        return super(C6, cls).__new__(cls, name, bases, dct)

def create_class(name, bases, dct):
    """
    元类也可以由 type 直接创建
    可以在创建类之前，对类名，父类列和属性字典进行操作后再创建类
    """
    # 对类名，父类列表和属性字典进行操作
    name += 'FromMetaClass'
    return type(name, bases, dct)

class C7(object):
    __metaclass__ = C6
    def __init__(self):
        pass

def outside(n): # 实现 Python 3 中 unlocal 的效果
    outside.total = 0
    def inside():
        print outside.total
        if isinstance(n, int):
            outside.total += n
            print outside.total
    return inside


def l1_decorator(f):
    def wrapper():
        # 执行 f 前操作
        rv = f()
        # 执行 f 后的操作
        return rv
    return wrapper

def l2_decorator(*args, **kwargs):
    def accept(f):
        @wraps(f)
        def wrapper(*fargs, **fkwargs):
            print args
            print kwargs
            return f(*fargs, **fkwargs)
        return wrapper
    return accept


"""
a.x 的查找方式
1, a.__dict__['x']
2, type(a).__dict__['x']
3, 除 metaclass 之外 mro 序列上所有基类的 __dict__['x']

如果 x 定义了 __get__
1, 如果 a 是一个对象
object.__getattribute__() 把 a.x 变成 type(a).__dict__['x'].__get__(a, type(a))
2, 如果 a 是一个类
type.__getattribute__() 把 A.x 变成 A.__dict__['x'].__get__(None, A)

描述器的调用是因为 __getattribute__()
重写 __getattribute__() 方法会阻止正常的描述器调用
__getattribute__() 只对新式类的实例可用
object.__getattribute__() 和 type.__getattribute__() 对 __get__() 的调用不一样
资料描述器总是比实例字典优先
非资料描述器可能被实例字典重写, 非资料描述器不如实例字典优先
"""

# c2 = C2()
# print C2.a
# print c2.a
# c2.a = 2
# print c2.a
# del c2.a
# print c2.a
# print c2.get_id()
# del c2
# # del C2.instance
#
# c3 = C3(1, 2, 3)
# print c3.c
# c3.c = 'test'
# c3.c = 20
# print c3.c
#
# c4 = C4(1, 2)
# print c4.sum
# c4.sum = -1
# print c4.sum
# c4.sum = 1
# print c4.sum
# print c4.__dict__
#
# c7 = C7()
# print type(c7)
# C8 = create_class('C8', (object,), {'a':1, 'b':2})
# c8 = C8()
# print c8
# print c8.a

@l2_decorator(1, 2, 3, a='test')
def test(a):
    print 'this in test', a

test('decorated')