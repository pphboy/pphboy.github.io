---
title: Flex布局专题
date: 2020-12-10 20:14:00
---

#### Flex布局专题

##### 参照 https://www.runoob.com/w3cnote/flex-grammar.html

* 下面是自己看代码的一下 小结，和认识，加笔记，加原文

1. 认识容器

   * flex布局需要基于一个容器才能开展
   * 在容器内的称为子容器

2. 容器的属性

   * **flex-direction**

     * 介绍：改变子容器排列的方向

     * ```css
       .box {
         flex-direction: row | row-reverse | column | column-reverse;
       }
       
       /*
       row（默认值）：主轴为水平方向，起点在左端。
       row-reverse：主轴为水平方向，起点在右端。
       reverse就是倒序的意思。
       column：主轴为垂直方向，起点在上沿。
       column-reverse：主轴为垂直方向，起点在下沿。
       */
       ```

   * **flex-wrap**

     * 介绍：控制子窗口是否换行，如何换行

     * ```css
       .box{
         flex-wrap: nowrap | wrap | wrap-reverse;
       }
       
       /*
       nowrap，不换行，
       wrap 换行
       wrap-reserve 倒序换行
       */
       ```

     * wrap-reserve 将子元素，倒序，然后，换行

   * **flex-flow**

     * flex-flow是flex-direction 和flex-wrap的简写形式，默认的值是row 和 nowrap

     * ```css
       .box {
         flex-flow: <flex-direction> <flex-wrap>;
       }
       ```

     * ```css
       .box {
           flex-flow: row nowrap;
       }
       .box {
           flex-flow: column wrap;
       }
       ```

   * **justify-content**

     * 介绍：justify-content属性定义了项目的对齐方式 

     * 就是定义了子元素如何分布

     * ```css
       .box {
         justify-content: flex-start | flex-end | center | space-between | space-around;
       }
       ```

     * 取值的具体介绍

       * flex-start 左对齐
       * flex-end 右对齐
       * center 居中对齐
       * space-between 两端对齐，项目之间的间隔都相等。
       * space-around: 每个项目两侧的间隔相等。项目之间的间隔，是边框的两倍。

   * **align-items**

     * 介绍：关于子元素在交叉轴上如何对齐 (个人觉得是相对 于 纵轴进行 对齐)

     * ```css
       .box {
           align-items:flex-item
       }
       ```

     * flex-start: 向上排列

     * flex-end:向下排列

     * center: 垂直居中排序

     * stretch :塞 满 整个纵轴

     * baseline:项目的第一行文字同一水平线

   * **align-content**

     * 介绍：align-content对很多个轴线(一行)，子元素的对齐 方式，如果 子元素只有一根轴线，则该 属性不起作用。

     * ```css
       .box {
         align-content: flex-start | flex-end | center | space-between | space-around | stretch;
       }
       ```

     * align-content的 flex-start | flex-end | center| stretch与 align-item是一样的

     * space-around：每根轴线两侧的间隔者相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。(这个的间隔是边框的1倍)

     * space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。（间隔是平均的，边框的大小 不知）

3. 子元素的 属性（在菜鸟的文档内说是项目的属性）

   * order

     * 定义项目的排列顺序，数值起小，越靠前，默认为0

   * flex-grow(这个是操作子元素，操作项目的)

     * flex-grow定义项目的缩放，默认为0，为0，就不做缩放。
     * 如果值都为1 ，则是平均分隔，反正就是根据这个值来分项目的大小

   * flex-shrink

     * flex-shrink 定义 项目的缩小比例，如果空间不够的时候，缩小项目。
     * ``如果所有项目的flex-shrink属性者为1，当空间不足时，都将等比例缩小。如果一个项目flex-shrink属性为0，其他项目都 为1 ，则空间不足时，前者不缩小。负值对该属性无效。``

   * flex-basis

     * flex-basis：分配多余的空间，如果有多余 的空间，可以分配给使用本属性的项目，项目的原本的默认值|大小 为auto。

   * flex

     * flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。

       ```css
       .item {
         flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'>]
       }
       ```

   * align-self

     * align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。

       ```css
       .item {
         align-self: auto | flex-start | flex-end | center | baseline | stretch;
       }
       
       ```

     * auto,flex-start,flex-end,center,baseline,stretch

     * 该 属性可能 取6个传值，除了 auto,其他都与align-items属性完全一致。