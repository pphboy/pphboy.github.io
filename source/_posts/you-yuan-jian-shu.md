---
title: Cpp 友元简述
date: 2022-09-25 15:11:00
---

友元函数，友元类

**使用友元，主要是易于直接访问数据，但友元本质是以破坏封装性为代价。**

下例引用于： 《C++程序设计（第2版）》

>>>
1. 友元声明位置由程序设计者决定，且不受类中public、private、protected权限控制符的影响。
2. 友元关系是单向的，即类A是类B的友元，但B不是A的友元。
3. 友元关系不具有传递性，即类C是类D的友元，类E是类C的友元，但类E不是类D的友元。
4. 友元关系不能被继承。
>>>

```cpp
#include <iostream>
#include <math.h>

using namespace std;

// 友元类的例子
class Time{
    friend class Circle;
public:
    void showDate();
private :
    int date;
};
void Time::showDate(){
    cout << "date = " << this->date << endl;
}

class Point;
class Circle{
    // friend void getArea(Circle &circle);
private:
    float radius;
    const float PI = 3.14;
public:
    void setTime(Time &time,int date);
    float getArea(Point &p1,Point &p2);
    Circle(float radius);
    ~Circle();
};
void Circle::setTime(Time &time,int date){
    time.date = date;
}

Circle::Circle(float radius = 0): radius(radius){
    cout << "圆的初始化半径为: "<< this->radius <<  endl;
}
Circle::~Circle(){
    cout << "i came,i saw, i conquered"<<endl;
}

class Point{
    friend float Circle::getArea(Point &p1,Point &p2);
public:
    Point(float x,float y);
    ~Point();
private:
    float x;
    float y;
};
Point::Point(float x,float y): x(x),y(y){
    cout << "初始化坐标" << endl;
}
Point::~Point(){};
// 如果是友元，则可以访问和修改私有成员变量 ，如果不是友元，从其根本上就无法访问私有变量 
// void getArea(Circle &circle){
//     cout << "圆的半径：" << circle.radius << endl;
//     cout <<"圆的面积：" << circle.PI * circle.radius* circle.radius << endl;
//     circle.radius = 1;
//     cout << "圆的半径：" << circle.radius << endl;
//     cout <<"圆的面积：" << circle.PI * circle.radius* circle.radius << endl;
// }

   // 如果一个类的成员函数被标识为另一个类的友元函数，则这个类的函数，可以通过引用直接访问另一个类的私有属性
float Circle::getArea(Point &p1,Point &p2){
    float x = abs(p1.x-p2.x);
    float y = abs(p1.y-p2.y);
    printf("坐标(%.2f,%.2f)\n",x,y);
    float len = sqrtf(x*x+y*y); //求两点之间的距离，这是勾股定理
    cout<< "两点之间的距离 : " << len << endl;
    return len*len*PI;
}


int main(int argc, char *argv[])
{
    Circle circle;
    Point p1(5,5);
    Point p2(10,10);
    circle.getArea(p1,p2);

    // 测试友元类
    // 存在 两个 类 A 与 B，如果B内部标识了 friend class A;
    // 则A 内部的函数即可通过 B的对象，直接访问B的私有成员
    Time time;
    circle.setTime(time,666);
    time.showDate();
    return 0;
}


```