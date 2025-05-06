---
title: Java  23 种设计模式学习
date: 2023-03-25 12:35:00
---

<div class="container-fluid">
<div class="row flex-xl-nowrap"><!-- VX_OUTLINE_PANEL_START -->
<div id="outline-panel" class="d-none d-md-block d-xl-block col-md-3 col-xl-2 bd-toc" style="display: none;"></div>
<!-- VX_OUTLINE_PANEL_END -->
<div id="post-content" class="col-12 col-md-9 col-xl-10 py-md-3 pl-md-5 bd-content">
<div id="vx-content" class="vx-constrain-image-width vx-image-align-center line-numbers">
<h1 id="java设计模式" class="source-line" data-source-line="0">Java设计模式</h1>
<p class="source-line" data-source-line="2">解决普遍存在的问题，反复出现的各种问题，所提出的解决方案。</p>
<h2 id="设计模式七大原则" class="source-line" data-source-line="4">设计模式七大原则</h2>
<ul>
<li class="source-line" data-source-line="6">设计模式七大原则：</li>
</ul>
<ol>
<li class="source-line" data-source-line="7">单一职责</li>
<li class="source-line" data-source-line="8">接口隔离</li>
<li class="source-line" data-source-line="9">依赖倒转</li>
<li class="source-line" data-source-line="10">里氏替换</li>
<li class="source-line" data-source-line="11">开闭原则</li>
<li class="source-line" data-source-line="12">迪米特法则</li>
<li class="source-line" data-source-line="13">合成复用原则</li>
</ol>
<p class="source-line" data-source-line="16">面向对象 =&gt; 功能模块[设计模式+算法] =&gt; 框架[调用多种模式] =&gt; 架构[服务器集群]</p>
<h3 id="单一职责原则" class="source-line" data-source-line="18">单一职责原则</h3>
<ol>
<li class="source-line" data-source-line="20">降低类的复杂度，一个类只负责一项职责</li>
<li class="source-line" data-source-line="21">提高类的可读性，可维护性</li>
<li class="source-line" data-source-line="22">降低变更引起的风险</li>
<li class="source-line" data-source-line="23">通常情况下，应当遵守单一职责原则，保有逻辑足够简单，才可以在代码级违法单一职责原则，只有类中方法数量足够少，可以在方法级别保持单一职责原则</li>
</ol>
<div class="code-toolbar">
<pre class="language-java line-numbers highlighter-hljs"><code>// 方法层面的单一职责
class Vehicle{
	
	public void runRoad() {
		System.out.println("公路");
	}
	public void runRiver() {
		System.out.println("水路");
	}
	public void runAirLine() {
		System.out.println("航道");
	}
}
// 类层面的单一职责
class RoadVehicle{
	public void run() {
		System.out.println("公路");
	}
}

class RiverVehicle{
	public void run() {
		System.out.println("水路");
	}
}

class AirVechile{
	public void run() {
		System.out.println("航道");
	}
}</code></pre>
</div>
<h3 id="接口隔离原则" class="source-line" data-source-line="59">接口隔离原则</h3>
<p class="source-line" data-source-line="61">将一个接口的功能进行拆分，让其成模块化的。这里的例子就是，一个接口有五个方法，如果两个类继承了，此接口，则需要实现十次。有些方法是用不到的。所以需要将折口拆分成几个接口。</p>
<p class="source-line" data-source-line="63"><strong><img src="https://img2023.cnblogs.com/blog/2146100/202303/2146100-20230325124208593-1406193523.png" alt="" class="vx-image-view-image" /></strong></p>
<p class="source-line" data-source-line="65">这样的使用的和维护的时候，更有针对性，而且耦合度更低。当然，其缺点就是可能会造成模块粒度不可控。</p>
<h3 id="依赖倒转原则" class="source-line" data-source-line="67">依赖倒转原则</h3>
<p class="source-line" data-source-line="69">将一个类型抽象为接口，这类型都是相同的属性，具有不同的细节特性。<br />如果动物 下 有 狗和猫，其都有走路和吃食的 属性（方法），但吃的不一样，所以需要不同的实现。</p>
<p class="source-line" data-source-line="72">但是整体业务是一样的，只需要更换不同的实现。面向接口编程就如同面向规范编程，不同产商同一标准，生产相同的零件，可能是颜色不一样，Logo不一样。</p>
<p class="source-line" data-source-line="74">下面只是 依赖关系 传递的一种操作。</p>
<ol>
<li class="source-line" data-source-line="76">接口传递</li>
<li class="source-line" data-source-line="77">构造方法传递</li>
<li class="source-line" data-source-line="78">setter传递</li>
</ol>
<div class="code-toolbar">
<pre class="language-java line-numbers highlighter-hljs"><code>public class DependencyInversion {
	public static void main(String[] args) {
		User user = new User();
		user.receive(new EmailMessage());
		user.receive(new WeChatMessage());
	}
}

class User {
	public void receive(Message msg) {
		System.out.println(msg.getInfo());
	}
}

interface Message{
	String getInfo();
}

class EmailMessage implements Message{

	@Override
	public String getInfo() {
		// TODO Auto-generated method stub
		return "电子邮件";
	}
	
}

class WeChatMessage implements Message{

	@Override
	public String getInfo() {
		// TODO Auto-generated method stub
		return "微信信息";
	}
	
}</code></pre>
</div>
<p class="source-line" data-source-line="120">总结：</p>
<ol>
<li class="source-line" data-source-line="122">底层最好是抽象类或接口，程序稳定性更好</li>
<li class="source-line" data-source-line="123">变量的声明类型尽量是抽象类和接口，这样在使用时，就是可以利用多态的特性，而不是直接把接口写死，利于后期代码的更新和维护。</li>
<li class="source-line" data-source-line="124">继承时遵循晨氏替换原则</li>
</ol>
<h3 id="里氏替换原则" class="source-line" data-source-line="126">里氏替换原则</h3>
<p class="source-line" data-source-line="128">这个我的总结就是不应该破坏原有的封装。在添加新的功能时，应当考虑原有代码的这个封装和可能存在的误导性。新的类或者方法需要与之前的模块进行一定的区分和隔离。</p>
<p class="source-line" data-source-line="130">这个隔离，就是把原有的继承关系，变成依赖关系。即可以重写方法，又可以使用相关性非常高的原有的继承关系。</p>
<div class="code-toolbar">
<pre class="language-java line-numbers highlighter-hljs"><code>class Base{
	public void Fly() {
		System.out.println("BASE");
	}
}

class A extends Base {
	public void Fly() {
		System.out.println("A");
	}
}

class B extends Base{
	private A a;
	
	public void setA(A a) {
		this.a = a;
	}
	
	public void Fly() {
		System.out.println("B");
	}
	
	public void AFly() {
		this.a.Fly();
	}
	
	public A getA() {
		return a;
	}
}</code></pre>
</div>
<h3 id="开闭原则" class="source-line" data-source-line="166">开闭原则</h3>
<p class="source-line" data-source-line="168">这原则的核心。</p>
<p class="source-line" data-source-line="170">很像是依整倒转原则，不过基类变成了抽象类。</p>
<p class="source-line" data-source-line="172">主要是提供使用接口，让其不需要为每个使用到的类而重写一个功能方法，直接使用抽象类的方法就可以了。</p>
<div class="code-toolbar">
<pre class="language-java line-numbers highlighter-hljs"><code>
public class Ocp {
	public static void main(String[] args) {
		Panel p = new Panel();
		p.drawGraph(new Triangle());
	}
}
class Panel {
	public void drawGraph(Shape shape) {
		shape.draw();
	}
}
abstract class Shape {
	public abstract void draw();
}
class Triangle extends Shape {
	@Override
	public void draw() {
		System.out.println("画三角形");
	}

}
class Retangle extends Shape {
	@Override
	public void draw() {
		System.out.println("画矩形");
	}

}</code></pre>
</div>
<h3 id="迪米特法则" class="source-line" data-source-line="206">迪米特法则</h3>
<p class="source-line" data-source-line="208">又称最少知道原则。</p>
<p class="source-line" data-source-line="210">简单理解为，如果不依赖，就不要在本类创建其任何相关的局部变量。</p>
<p class="source-line" data-source-line="212">不依赖的意思就是不是直接朋友，不是直接朋友就是不依赖。</p>
<p class="source-line" data-source-line="214">老师内，有直接依赖学生，所以老师可以在局部创建学生的变量，而学生并不依赖老师，所以在使用的时候，不能直接创建老师的局部变量。</p>
<p class="source-line" data-source-line="216">所以这种操作，可以转为 其他的直接朋友进行操作，就是一个主抽象类，即依赖了老师，又依赖了学生，那么这种局部的操作，可以转给此类进行操作。</p>
<ol>
<li class="source-line" data-source-line="218">迪米特法则的核心是降低类之间的耦合</li>
<li class="source-line" data-source-line="219">由于每个类都减少了不必要的依赖，因此迪米特法则只是要求降低类间耦合关系，并不是要求公开赛没有依赖关系。</li>
</ol>
<div class="code-toolbar">
<pre class="language-java line-numbers highlighter-hljs"><code>class Manager{
	public void getAllTeacher() {
	}

	public void getAllStudent() {
	}
}

class Teacher{
	List&lt;Student&gt;  myClass;
	
	public void showMyClass(Manager manager) {
		myClass = new ArrayList&lt;Student&gt;();
		manager.getAllStudent();
	}
}

class Student{
	
	public void getMyTeachers(Manager manage) {
		manage.getAllTeacher();
	}
}</code></pre>
</div>
<h3 id="合成复用原则" class="source-line" data-source-line="247">合成复用原则</h3>
<p class="source-line" data-source-line="249">原则是尽量使用全成/聚合的方式，而不是使用继承。</p>
<p class="source-line" data-source-line="251">就是说，新手可能在使用一个类的时候会直接使用继承，这样显然是主动耦合了，在维护上会出现很大的关联性的问题。一般在使用一个类的时候，一般使用 依赖，合成 和 聚合。</p>
<h3 id="总结" class="source-line" data-source-line="255">总结</h3>
<ol>
<li class="source-line" data-source-line="257">找出应用中可能需要变化之处，把它们独立出来，不要和那些不需要变化的代码混在一起。</li>
<li class="source-line" data-source-line="258">针对接口编程，而不是针对实现编程。</li>
<li class="source-line" data-source-line="259">为了交互对象之间的松耦合设计而努力。</li>
</ol>
<h2 id="设计模式" class="source-line" data-source-line="262">设计模式</h2>
<h3 id="类型" class="source-line" data-source-line="264">类型</h3>
<ol>
<li class="source-line" data-source-line="266">创建型模式：单例模式、抽象工厂模式、原型模式、建造者模式、工厂模式</li>
<li class="source-line" data-source-line="267">结构型模式：适配器模式、桥接模式、装饰模式、组合模式、外观模式、享元模式、代理模式</li>
<li class="source-line" data-source-line="268">行为型模式：模板方法模式、命令模式、访问者模式、迭代器模式、观察者模式、中介模式、备忘录模式、解释器模式、状态模式、策略模式、职责链模式（责任链模式）</li>
</ol>
<h2 id="创建型模式" class="source-line" data-source-line="270">创建型模式</h2>
<h3 id="单例模式" class="source-line" data-source-line="272">单例模式</h3>
<h4 id="懒汉式（线程安全，同步方法）" class="source-line" data-source-line="274">懒汉式（线程安全，同步方法）</h4>
<ol>
<li class="source-line" data-source-line="276">解决了线程不安全问题，但效率太低了，也不推荐，但我记录下。</li>
</ol>
<div class="code-toolbar">
<pre class="language-java line-numbers highlighter-hljs"><code>public class SongletonSecureThread {
	
	private static SongletonSecureThread sst;
	
	private SongletonSecureThread() {
	}
	
	public static synchronized SongletonSecureThread getInstance() {
		if(sst == null) {
			sst = new SongletonSecureThread();
		}
		return sst;
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		System.out.println(SongletonSecureThread.getInstance().hashCode());
		System.out.println(SongletonSecureThread.getInstance().hashCode());
	}

}</code></pre>
</div>
<h4 id="双重检查" class="source-line" data-source-line="302">双重检查</h4>
<ol>
<li class="source-line" data-source-line="304">DoubleCheck概念是多线程使用的</li>
<li class="source-line" data-source-line="305">再次判断，线程安全，延迟加载，效率较高<br />实际开发中，非常推荐</li>
</ol>
<div class="code-toolbar">
<pre class="language-java line-numbers highlighter-hljs"><code>public class SongletonSecureThread {
	
	private static volatile SongletonSecureThread sst;
	
	private SongletonSecureThread() {
	}
	
	public static synchronized SongletonSecureThread getInstance() {
		if(sst == null) {
			synchronized(SongletonSecureThread.class) {
				if(sst == null) {
					sst = new SongletonSecureThread();
				}
			}
		}
		return sst;
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		System.out.println(SongletonSecureThread.getInstance().hashCode());
		System.out.println(SongletonSecureThread.getInstance().hashCode());
	}

}</code></pre>
</div>
<h4 id="静态内部类" class="source-line" data-source-line="338">静态内部类</h4>
<p class="source-line" data-source-line="340">使用了JVM的装载机制，静态内部类在父类装载时并不被实例化，而是在需要实例化时，调用 GetInstance方法，才会装载SIngletonInstance类。</p>
<p class="source-line" data-source-line="342">优点：使用JVM的机制实现了懒加载，并且是线程安全的。<br />推荐使用</p>
<div class="code-toolbar">
<pre class="language-java line-numbers highlighter-hljs"><code>public class SingletonInterClass {

	public SingletonInterClass() {
		
	}
	
	private static class SingletonInstance{
		private static final SingletonInterClass INSTANCE = new SingletonInterClass();
	}
	
	public static SingletonInterClass getInstance() {
		return SingletonInstance.INSTANCE;
	}
}</code></pre>
</div>
<h4 id="单例枚举" class="source-line" data-source-line="364">单例枚举</h4>
<p class="source-line" data-source-line="366">能避免多线程同步的总理 ，还能防止反序列化重新创建新的对象<br />《effective Java》作者推荐</p>
<p class="source-line" data-source-line="369">推荐使用</p>
<div class="code-toolbar">
<pre class="language-java line-numbers highlighter-hljs"><code>public class SingletonEnum {
	public static void main(String[] args) {
		System.out.println(Singleton.INSTANCE.get() == Singleton.INSTANCE.get());
	}
}


enum Singleton{
	INSTANCE;
	private SingletonEnum se;

	Singleton() {
		if(se == null) {
			se =new SingletonEnum();
		}
	}
	
	public SingletonEnum get() {
		return se;
	}
	
}</code></pre>
</div>
<h4 id="总结-1" class="source-line" data-source-line="397">总结</h4>
<p class="source-line" data-source-line="399">单例模式注意事项和细节说明：</p>
<ol>
<li class="source-line" data-source-line="401">
<p class="source-line" data-source-line="401">单例模式保证了系统内存中该类只存在一个对象，节省了系统资源，对于一些需要频繁创建销毁的对象，使用单例模式可以提高系统性能</p>
</li>
<li class="source-line" data-source-line="403">
<p class="source-line" data-source-line="403">当想实例化一个单例类的时候，必须要记住使用相应的获取对象的方法，而不是使用new</p>
</li>
<li class="source-line" data-source-line="405">
<p class="source-line" data-source-line="405">单例模式使用的场景：需要频繁的进行创建和销毁的对象、创建对象时耗时过多或耗费资源过多，但又经常用到的对象、工具类对象、频繁访问数据库或文件的对象（比如数据源、session工厂等）。</p>
</li>
</ol>
<p class="source-line" data-source-line="408">Runtime 使用的是 饿汉式 单列模式的编写方法。</p>
<p class="source-line" data-source-line="410">每次使用的时候都需要考虑使用场景。</p>
<h3 id="工厂模式" class="source-line" data-source-line="412">工厂模式</h3>
<p class="source-line" data-source-line="414">通过一个工厂类，获取不通的解决方案。</p>
<p class="source-line" data-source-line="416">工厂可以是类也可以是方法。</p>
<p class="source-line" data-source-line="418">最好的例子，就是造包子，不同的馅料。</p>
<p class="source-line" data-source-line="420">工厂方法模式：定义了一个创建对象的抽象方法，由子类决定要实例化的类，工厂方法模式将对象的实例化推迟到子类。</p>
<img src="https://img2023.cnblogs.com/blog/2146100/202303/2146100-20230325124208365-1777358403.png" alt="" class="vx-image-view-image" />
<div class="code-toolbar">
<pre class="language-java line-numbers highlighter-hljs"><code>public class BunFactory {
	
	public Bun createBun(String bunType) {
		Bun bun = null;
		switch(bunType) {
		case "hnrb": 
			bun = new HuanMeetBun();
			break;
		case "hncb": bun = new HunanGreensBun(); break; 
		case "sdcb": bun = new SdGreendsBun(); break;
		case "sdrb": bun = new SdMeetBun();break;
		}

		return bun;
	}
	
	public static void main(String[] args) {
		BunFactory bunfactory = new BunFactory();
		bunfactory.createBun("hncb");
		bunfactory.createBun("hnrb");
		bunfactory.createBun("sdcb");
	}
}</code></pre>
</div>
<h4 id="抽象工厂方法" class="source-line" data-source-line="452">抽象工厂方法</h4>
<img src="https://img2023.cnblogs.com/blog/2146100/202303/2146100-20230325124208604-1000416662.png" alt="" class="vx-image-view-image" />
<p class="source-line" data-source-line="456">虽然这个抽象方法也就是一个接口，但其是用了几个工厂类的实现。<br />就是进一步的将工厂进行抽象了，先是基于工厂为基础进行开发。而抽象工厂，则是直接将这个抽象工厂作为一个中心。（这个图中的UML是错的）</p>
<h4 id="静态工厂" class="source-line" data-source-line="459">静态工厂</h4>
<p class="source-line" data-source-line="461">在一个里有一个静态方法用来将输入的数字yyyyMMdd转成LocalDate</p>
<div class="code-toolbar">
<pre class="language-java line-numbers highlighter-hljs"><code>public class LocalDateFactory {

	public static LocalDate fromInt(int yyyyMMdd) {
		int year = yyyyMMdd / 10000;
		int month = yyyyMMdd % 10000 / 100;
		int day = yyyyMMdd % 100;
		if (month &gt; 12 &amp;&amp; day &gt; 31) {
			throw new RuntimeException("number out of the normal range");
		}
		System.out.println(year + " " + month + " " + day);

		return LocalDate.of(year, month, day);
	}

	@Test
	public void testMain() {
		System.out.println(LocalDateFactory.fromInt(20020321));
	}
}</code></pre>
</div>
<h4 id="抽象工厂" class="source-line" data-source-line="486">抽象工厂</h4>
<p class="source-line" data-source-line="488">这里的抽象工厂的作用就是将使用的工厂和接口都抽象出来，然后每种类型都需要不同的实现。</p>
<p class="source-line" data-source-line="491">测试 方法</p>
<div class="code-toolbar">
<pre class="language-java line-numbers highlighter-hljs"><code>@Test
public void testFactory() throws IOException {
	FastFactory ff = new FastFactory();
	
	HtmlDocument hd = ff.createHtml("# Hello World \n");
	hd.save(Paths.get(".","good.html"));

}</code></pre>
</div>
<p class="source-line" data-source-line="503">工厂类接口和工厂实现类</p>
<div class="code-toolbar">
<pre class="language-java line-numbers highlighter-hljs"><code>public abstract class AbstractFactory {
	
	public abstract HtmlDocument createHtml(String md);
	
	public abstract WordDocument createWord(String md);
}

// -----------

public class FastFactory extends AbstractFactory{

	@Override
	public HtmlDocument createHtml(String md) {
		return new FastHtmlDocument(md);
	}

	@Override
	public WordDocument createWord(String md) {
		// TODO Auto-generated method stub
		return null;
	}
	
}</code></pre>
</div>
<p class="source-line" data-source-line="532">Document接口和实现类</p>
<div class="code-toolbar">
<pre class="language-java line-numbers highlighter-hljs"><code>
public interface HtmlDocument {

	public String toHtml();

	public void save(Path path) throws IOException;
}

// -------------------------------
public class FastHtmlDocument implements HtmlDocument{
	private String md;

	
	public FastHtmlDocument(String md) {
		this.md = md;
	}

	@Override
	public String toHtml() {
		// TODO Auto-generated method stub
		return md.lines().map(s -&gt; {
			if(s.startsWith("#"))
				return "&lt;h1&gt;"+s.substring(1)+"&lt;/h1&gt;";
			return "&lt;p&gt;"+s+"&lt;/p&gt;";
		}).reduce("", (acc,s)-&gt; acc+ s + "\n");
	}

	@Override
	public void save(Path path) throws IOException {
		Files.write(path,toHtml().getBytes("UTF-8"));
	}

}</code></pre>
</div>
<h4 id="工厂模式小结" class="source-line" data-source-line="570">工厂模式小结</h4>
<ol>
<li class="source-line" data-source-line="572">工厂模式的意义<br />将实例化的对象的代码提取出来，放到一个类中统一管理和维护，达到和主项目的依赖关系的解耦，从而提高项目的扩展和维护性</li>
<li class="source-line" data-source-line="574">三种工厂模式（简单工厂模式、工厂方法模式、抽象工厂模式）</li>
<li class="source-line" data-source-line="575">设计模式的依赖抽象原则</li>
</ol>
<p class="source-line" data-source-line="577">设计模式的依赖抽象原则：</p>
<ul>
<li class="source-line" data-source-line="579">创建对象实例时，不要直接new类，而是把这个new类的动作放在一个工厂的方法中，并返回。有的书推荐，变量不要直接持有具体的引用。</li>
<li class="source-line" data-source-line="580">不要让类继承具体类，而是继承抽象类或者是实现interface。</li>
<li class="source-line" data-source-line="581">不要覆盖蕨类中已经实现的方法</li>
</ul>
<h3 id="原型模式-基本介绍" class="source-line" data-source-line="584">原型模式-基本介绍</h3>
<p class="source-line" data-source-line="586">基本介绍</p>
<ol>
<li class="source-line" data-source-line="588">原型模式（Prototype）是指：用原型实例指定创建对象的各类，并且通过挂账这些原型，创建新的对象。</li>
<li class="source-line" data-source-line="589">原型模式是一种创建型设计模式，允许一个对象再创建另外一个可定制的对象，无需知道如何创建的细节</li>
<li class="source-line" data-source-line="590">工作原理是通过将一个原型对象传给那个要发动创建的对象，这个要发动创建的对象通过 请求原型对象拷贝它们自己来实施创建，即 对象.clone()</li>
<li class="source-line" data-source-line="591">需要实现Cloneable接口，不然会报错</li>
</ol>
<div class="code-toolbar">
<pre class="language-java line-numbers highlighter-hljs"><code>public class Sheep implements  Cloneable {
	
	private String name;
	private int age;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	
	
	public Sheep(String name, int age) {
		super();
		this.name = name;
		this.age = age;
	}
	@Override
	public String toString() {
		return "Sheep [name=" + name + ", age=" + age + "]";
	}

	@Override
	protected Object clone() {
		// TODO Auto-generated method stub

		Sheep sheep =null;
		try {
			sheep = (Sheep) super.clone();
		} catch (CloneNotSupportedException e) {
			e.printStackTrace();
		}

		return sheep;
	}
	
	

}
public class Test {

	public static void main(String[] args) throws CloneNotSupportedException {
		System.out.println(System.getProperty("java.version"));
		Sheep tomk = new Sheep("我是Tomk",10);
		System.out.println(tomk);
		Sheep tomb = (Sheep)tomk.clone();
		tomb.setName("我是Tomb");
		tomb.setAge(100);
		System.out.println(tomb);
	}
}</code></pre>
</div>
<h4 id="spring的原型的应用" class="source-line" data-source-line="653">Spring的原型的应用</h4>
<p class="source-line" data-source-line="654">Spring配置Bean时可以选择使用原型还是单例。如果选择原型，则每次创建的对象都不同。</p>
<ul class="contains-task-list">
<li class="task-list-item source-line" data-source-line="656"><input class="task-list-item-checkbox" disabled="disabled" type="checkbox" /> 分析Spring的bean创建的代码</li>
</ul>
<div class="code-toolbar">
<pre class="language-xml line-numbers highlighter-hljs"><code>    &lt;bean id="helloWorld" class="com.example.HelloWorld" scope="prototype"&gt;
        &lt;property name="message" value="Hello World!"/&gt;
    &lt;/bean&gt;</code></pre>
</div>
<h4 id="深拷贝" class="source-line" data-source-line="664">深拷贝</h4>
<p class="source-line" data-source-line="666">浅拷贝时，对象内的成员属性如果是引用类型，则直接复制其引用的地址，而不是重新拷贝一份。这样的问题就是所有浅拷贝的对象，都是同一个引用成员属性。</p>
<div class="code-toolbar">
<pre class="language-java line-numbers highlighter-hljs"><code>	private String name;
	private int age;
	private Sheep friend;</code></pre>
</div>
<img src="https://img2023.cnblogs.com/blog/2146100/202303/2146100-20230325124208790-1608444008.png" alt="" class="vx-image-view-image" />
<h5 id="clone方法里手动拷贝" class="source-line" data-source-line="676">clone方法里手动拷贝</h5>
<ul>
<li class="source-line" data-source-line="678">引用对象越多越不方便</li>
</ul>
<div class="code-toolbar">
<pre class="language-java line-numbers highlighter-hljs"><code>public class SheepDeep implements Cloneable {

	private String name;
	private int age;
	private SheepTarget sheepTarget;

	@Override
	public String toString() {
		return "Sheep [name=" + name + ", age=" + age + ", sheepTarget=" + sheepTarget + "]";
	}

	public SheepTarget getSheepTarget() {
		return sheepTarget;
	}

	public void setSheepTarget(SheepTarget sheepTarget) {
		this.sheepTarget = sheepTarget;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public SheepDeep(String name, int age, SheepTarget sheepTarget) {
		super();
		this.name = name;
		this.age = age;
		this.sheepTarget = sheepTarget;
	}

	@Override
	protected Object clone() throws CloneNotSupportedException {
		SheepDeep sheep = (SheepDeep) super.clone();
		// 使用这种方法是这样子的，需要将每个引用类型的成员属性都进行克隆
		sheep.setSheepTarget((SheepTarget) sheepTarget.clone());

		return sheep;
	}

}</code></pre>
</div>
<img src="https://img2023.cnblogs.com/blog/2146100/202303/2146100-20230325124208531-1332630655.png" alt="" class="vx-image-view-image" />
<h5 id="使用序列化来实现拷贝(推荐)" class="source-line" data-source-line="738">使用序列化来实现拷贝(推荐)</h5>
<p class="source-line" data-source-line="740">原理: 将对象序列化成字节数组，然后将字节数组反序列化。这样原来的值都需要创建新的内存空间，所以引用会发生改变。以达到深度拷贝的效果。</p>
<div class="code-toolbar">
<pre class="language-java line-numbers highlighter-hljs"><code>public class SheepDeep implements Cloneable ,Serializable{

	private String name;
	private int age;
	private SheepTarget sheepTarget;

	@Override
	public String toString() {
		return "Sheep [name=" + name + ", age=" + age + ", sheepTarget=" + sheepTarget + "]";
	}

	public SheepTarget getSheepTarget() {
		return sheepTarget;
	}

	public void setSheepTarget(SheepTarget sheepTarget) {
		this.sheepTarget = sheepTarget;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public SheepDeep(String name, int age, SheepTarget sheepTarget) {
		super();
		this.name = name;
		this.age = age;
		this.sheepTarget = sheepTarget;
	}

	@Override
	protected Object clone() throws CloneNotSupportedException {
		SheepDeep sheep = (SheepDeep) super.clone();
		// 使用这种方法是这样子的，需要将每个引用类型的成员属性都进行克隆
		sheep.setSheepTarget((SheepTarget) sheepTarget.clone());
		return sheep;
	}
	
	public Object deepClone() {
		// 现实中使用这里应该是需要使用工具类的
		ByteArrayOutputStream bos = null;
		ObjectOutputStream oos = null;
		ByteArrayInputStream bis = null;
		ObjectInputStream ois = null;
		try {
			bos = new ByteArrayOutputStream();
			oos = new ObjectOutputStream(bos);
			
			// 把对象和对象的值全部序列化到内存
			oos.writeObject(this);
			
			// 反序列化，把字节转成对象，会重新为成员属性创建新的对象
			bis = new ByteArrayInputStream(bos.toByteArray());
			ois = new ObjectInputStream(bis);
			return ois.readObject();
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return null;

	}

}</code></pre>
</div>
<img src="https://img2023.cnblogs.com/blog/2146100/202303/2146100-20230325124208539-1672598976.png" alt="" class="vx-image-view-image" />
<h4 id="原型模式总结" class="source-line" data-source-line="826">原型模式总结</h4>
<p class="source-line" data-source-line="828">默认是使用浅拷贝，如果需要深度拷贝，则需要自定义方法，会破坏OCP原则。</p>
<p class="source-line" data-source-line="830">原型的话，就是在Bean的 创建的时候使用，我想，如果创建一个容器，或者获取一些临时的Bean的时候，都需要用到。</p>
<h3 id="建造者模式" class="source-line" data-source-line="833">建造者模式</h3>
<p class="source-line" data-source-line="835">好理解，易操作。<br />设计的程序结构，过于简单，没有设计缓存层对象，程序的扩展和维护不好，也就是说，这种设计方案，把产品和创建产品的过程封装在一起，耦合性增加了。</p>
<p class="source-line" data-source-line="838">解决方案：将产品和产品建造过程解耦 =》 建造者模式。</p>
<ul>
<li class="source-line" data-source-line="840">
<p class="source-line" data-source-line="840">尚硅谷的版本</p>
</li>
<li class="source-line" data-source-line="843">
<p class="source-line" data-source-line="843">ChatGPT写的版本</p>
</li>
</ul>
<div class="code-toolbar">
<pre class="language-java line-numbers highlighter-hljs"><code>public class Burger {
    private String bun;
    private String patty;
    private boolean cheese;

    private Burger(BurgerBuilder builder) {
        this.bun = builder.bun;
        this.patty = builder.patty;
        this.cheese = builder.cheese;
    }

    public static class BurgerBuilder {
        private String bun;
        private String patty;
        private boolean cheese;

        public BurgerBuilder setBun(String bun) {
            this.bun = bun;
            return this;
        }

        public BurgerBuilder setPatty(String patty) {
            this.patty = patty;
            return this;
        }

        public BurgerBuilder setCheese(boolean cheese) {
            this.cheese = cheese;
            return this;
        }

        public Burger build() {
            return new Burger(this);
        }
    }

    // Getters and setters
}

// Example usage:
Burger burger = new Burger.BurgerBuilder()
        .setBun("Sesame Seed")
        .setPatty("Beef")
        .setCheese(true)
        .build();</code></pre>
</div>
<h3 id="生成器模式" class="source-line" data-source-line="896">生成器模式</h3>
<p class="source-line" data-source-line="899">聚合一些成员属性，然后使用这些成员属性建构一个新的对象。<br />下面的例子就是使用 使用一些字符串，建构一个URL链接。</p>
<div class="code-toolbar">
<pre class="language-java line-numbers highlighter-hljs"><code>
public class URLBuilder {
	
	public static URL builder() {
		return new URL();
	}
	
	@Test
	public void testBuilder() {
		String url = URLBuilder.builder()
		.setDomain("www.kbug.cn")
		.setPath("/")
		.setQuery(Map.of("name","mark"))
		.setScheme("https")
		.build();
		System.out.println("URL=&gt; "+url);
	}
}


public class URL {
	private String domain;
	private String scheme;
	private String path;
	private Map&lt;String,Object&gt; query;
	public String getDomain() {
		return domain;
	}
	public URL setDomain(String domain) {
		this.domain = domain;
		return this;
	}
	public String getScheme() {
		return scheme;
	}
	public URL setScheme(String scheme) {
		this.scheme = scheme;
		return this;
	}
	public String getPath() {
		return path;
	}
	public URL setPath(String path) {
		this.path = path;
		return this;
	}
	public Map&lt;String, Object&gt; getQuery() {
		return query;
	}
	public URL setQuery(Map&lt;String, Object&gt; query) {
		this.query = query;
		return this;
	}
	
	@Override
	public String toString() {
		return "URL [domain=" + domain + ", scheme=" + scheme + ", path=" + path + ", query=" + query + "]";
	}
	
	public String mapToQueryParam(Map&lt;String,Object&gt; map) {
		StringBuilder sb = new StringBuilder();
		sb.append("?");
		
		for(String key: map.keySet()) {
			sb.append(key+"="+map.get(key));
			sb.append("&amp;");
		}
		String queryStr = sb.toString();
		queryStr = queryStr.substring(0,queryStr.length()-1);
		return queryStr;
	}
	
	public String build() {
		return scheme+"://"+domain+path+mapToQueryParam(query);
	}

	

}</code></pre>
</div>
<h3 id="接口适配器" class="source-line" data-source-line="988">接口适配器</h3>
<p class="source-line" data-source-line="990">我觉得在适配器里把聚合的思想应用 的非常好。就是把一些不能直接使用的资源，用适配器过滤一下就能用了。并且耦合性不高，扩展性很好。</p>
<p class="source-line" data-source-line="992">（视频确实讲的很全）</p>
<p class="source-line" data-source-line="994">然后就是有几种实现方式：</p>
<div class="code-toolbar">
<pre class="language-java line-numbers highlighter-hljs"><code>public interface BigInter {
	
	public void m1();
	public void m2();
	public void m3();
	public void m4();
}

public abstract class RanAbsAdapter implements BigInter{

	@Override
	public void m1() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void m2() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void m3() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void m4() {
		// TODO Auto-generated method stub
		
	}
	
	
}

public class TestAbsAdapter {

	
	@Test
	public void testAbsAdapter() {
		BigInter bi =new RanAbsAdapter() {

			@Override
			public void m1() {
				super.m1();
				System.out.println("执行M1");
			}
			
		};
		bi.m1();
	}
}</code></pre>
</div>
<h4 id="总结-2" class="source-line" data-source-line="1056">总结</h4>
<p class="source-line" data-source-line="1058">就是依赖倒转，为每个可能实现一个Adapter类，然后需要实现对应的操作。</p>
<p class="source-line" data-source-line="1060">类适配器：在Adapter里，将src当做类，继承<br />对象适配器：在Adapter里，将src作为一个对象，持有<br />接口适配器：以Adapter里，将SRC作为一个接口实现</p>
<p class="source-line" data-source-line="1064">下图就是接口适配器。</p>
<img src="https://img2023.cnblogs.com/blog/2146100/202303/2146100-20230325124208800-1200080774.png" alt="" class="vx-image-view-image" />
<h3 id="接口模式" class="source-line" data-source-line="1069">接口模式</h3>
<ol>
<li class="source-line" data-source-line="1071">桥接模式（Bridge模式）是指：将实现与抽象放在两个不同的类层次中，使两个层次可以独立改变。</li>
<li class="source-line" data-source-line="1072">是一种结构型设计模式</li>
<li class="source-line" data-source-line="1073">Bridge模式基于类的最小设计原则，通过使用封装、聚合及继承等行为让不同的类承担不同的职责。它的主要特点是把抽象（Abstraction）与行为实现（Implementation）分离开来。从而可以保持各部分的独立性以及应对他们的功能扩展。</li>
</ol>
<p class="source-line" data-source-line="1075">具体的操作：就是抽象一个接口，然后聚合这个接口，但是其使用的依赖倒转，其本质的实现是不相同的。</p>
<div class="code-toolbar">
<pre class="language-java line-numbers highlighter-hljs"><code>public class TestDridge {

	@Test
	public void testBridge() {
		
		Phone phone = new PatPhone(new HuaWei());
		phone.use();
	}
}

interface Brand{
	public String getInfo();
	public void call();
}

class HuaWei implements Brand{

	@Override
	public String getInfo() {
		return "中国华为";
	}

	@Override
	public void call() {
		System.out.println("Use Huawei 打电话");
	}
}

class Realme implements Brand {

	@Override
	public String getInfo() {
		return "Oppo 真我";
	}

	@Override
	public void call() {
		System.out.println("Fuck up Redmi, I m realme. ");
	}
	
}

abstract class Phone {
	Brand brand;
	
	public Phone(Brand brand) {
		this.brand = brand;
	}
	
	public void use() {
		brand.call();
	}
}

class PatPhone extends Phone{
	
	public PatPhone(Brand brand) {
		super(brand);
	}
}</code></pre>
</div>
<img src="https://img2023.cnblogs.com/blog/2146100/202303/2146100-20230325124208690-1983767537.png" alt="" class="vx-image-view-image" />
<h3 id="装饰者设计模式" class="source-line" data-source-line="1144">装饰者设计模式</h3>
<p class="source-line" data-source-line="1146">装饰者就相当于快递打包，一层一层的。线性的角度来看有点像链表，其实就是一个层层加码的过程。你需要什么，你就需要套着什么。例子就是咖啡加一些小料。</p>
<p class="source-line" data-source-line="1148">我的感觉就是通过引用一层套着一层，在功能上是可以无限扩充的。就是基于一个主体，无限 扩充。</p>
<p class="source-line" data-source-line="1150">一个哲学的概念就是：&ldquo;学习我，成为我&rdquo;。</p>
<ul>
<li class="source-line" data-source-line="1153">装饰者模式：动态的将新功能附加到对象上，在对象功能扩展方面，它比继承更有弹性，装饰者模式也体现了开闭原则。</li>
</ul>
<div class="code-toolbar">
<pre class="language-java line-numbers highlighter-hljs"><code>public class TestDecorator {

	@Test
	public void testDecorator() {
		Drink order = new Latte();
		order = new Paprika(order);
		order = new Salt(order); // 拿铁加盐

		System.out.println(order.cost());
		System.out.println(order.getIntro());
		;
	}
}

abstract class Drink {

	private String intro;
	private double price;

	public String getIntro() {
		return intro;
	}

	public void setIntro(String intro) {
		this.intro = intro;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public abstract double cost();
}

class Coffee extends Drink {

	@Override
	public double cost() {
		return super.getPrice();
	}

}

class Espresso extends Coffee {

	public Espresso() {
		setPrice(10.99F);
		setIntro("越南浓咖啡");
	}
}

class Latte extends Coffee {

	public Latte() {
		setPrice(10.66F);
		setIntro("湖南打铁 price: " + getPrice());
	}
}

class Decorator extends Drink {

	private Drink drink;

	/**
	 * 这里构造方法就是相当于嵌套，也就是说 装饰模式 &lt;br&gt;
	 * 就是 将对象以引用的方法嵌套在其他对象 中 &lt;br&gt;
	 * 非常像一个链接，但不是一个数据结构，而是代码的抽象逻辑结构
	 * 
	 * @param drink
	 */
	public Decorator(Drink drink) {
		this.drink = drink;
	}

	@Override
	public double cost() {
		// TODO Auto-generated method stub
		// 这是不应该是+drink的price，而加drink 的 汇总值
		return getPrice() + drink.cost();
	}

	@Override
	public String getIntro() {
		// TODO Auto-generated method stub
		return super.getIntro() + " price: " + getPrice() + " &amp;&amp; " + drink.getIntro();
	}

}
// 下面是一些调料，这些调料都会继承装饰器

class Paprika extends Decorator {

	public Paprika(Drink drink) {
		super(drink);
		setPrice(10.0f);
		setIntro("香甜可口湖南辣椒");
	}
}

class Salt extends Decorator {

	public Salt(Drink drink) {
		super(drink);
		setPrice(1.0f);
		setIntro("不咸的盐");
	}
}</code></pre>
</div>
<p class="source-line" data-source-line="1271">下面是执行结果</p>
<div class="code-toolbar">
<pre class="language-txt line-numbers highlighter-hljs"><code>51.65999984741211
不咸的盐 price: 1.0 &amp;&amp; 香甜可口湖南辣椒 price: 10.0 &amp;&amp; 香甜可口湖南辣椒 price: 10.0 &amp;&amp; 香甜可口湖南辣椒 price: 10.0 &amp;&amp; 香甜可口湖南辣椒 price: 10.0 &amp;&amp; 湖南打铁 price: 10.65999984741211</code></pre>
</div>
<p class="source-line" data-source-line="1277">这个例子是很容易的理解的，非常类似于递归。需要注意的事，在返回price时，需要返回前几个Price总的值，而不是返回当前的price。可以说是对象嵌着对象的递归操作。</p>
<h3 id="组合模式" class="source-line" data-source-line="1280">组合模式</h3>
<p class="source-line" data-source-line="1282">这是把系统中所有模块都有统一的特性，然后这些模块都是有相互的关系，上下级。然后组成一套系统。</p>
<p class="source-line" data-source-line="1284">所以说每个模块都实现了这个Component类，然后又是递进的关系进行依赖。</p>
<p class="source-line" data-source-line="1286">(我越来越感觉这是不是一种抽象级别的数据结构)</p>
<ol>
<li class="source-line" data-source-line="1289">简化客户端操作。客户端只需要面对一致的对象，而不用考虑整体部分或者节点叶子的问题。</li>
<li class="source-line" data-source-line="1290">具有较强的扩展性。当我们要更改组合对象时，我们只需要调整内部的层次关系，客户端不用做出任何发动。</li>
<li class="source-line" data-source-line="1291">方便创建出复杂的层次结构，客户端不用理会组合里面的组成细节，容易添加节点或者叶子从而创建出复杂的树形结构。</li>
<li class="source-line" data-source-line="1292">需要遍历组织机构，或者处理对象具有树形结构时，非常适合使用组合模式</li>
<li class="source-line" data-source-line="1293">要求较高的抽象性，如果节点和叶子有很多差异性的话，比如很多方法和属性都不一样，不适合使用组合模式。</li>
</ol>
<img src="https://img2023.cnblogs.com/blog/2146100/202303/2146100-20230325124208596-1503869227.png" alt="" class="vx-image-view-image" />
<div class="code-toolbar">
<pre class="language-java line-numbers highlighter-hljs"><code>@Test
public void testComposite() {
	University us = new University("清华大学","让中华震惊世界");
	us.add(new Department("计算机科学与工程学院", ""));
	us.add(new Department("材料学院", ""));
	us.print();
}


public abstract class OriganizationComponent {
	
	private String name;
	private String intro;
	
	protected void add(OriganizationComponent o) {
		throw new UnsupportedOperationException();
	}
	
	protected void remove(OriganizationComponent o) {
		throw new UnsupportedOperationException();
	}

	protected void print() {
		throw new UnsupportedOperationException();
	}

	public OriganizationComponent(String name, String intro) {
		super();
		this.name = name;
		this.intro = intro;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getIntro() {
		return intro;
	}

	public void setIntro(String intro) {
		this.intro = intro;
	}
	

}


public class University extends OriganizationComponent{

	List&lt;OriganizationComponent&gt; olist = new ArrayList&lt;&gt;();
	
	public University(String name, String intro) {
		super(name, intro);
		// TODO Auto-generated constructor stub
	}

	@Override
	protected void add(OriganizationComponent o) {
		// TODO Auto-generated method stub
		olist.add(o);
	}

	@Override
	protected void remove(OriganizationComponent o) {
		// TODO Auto-generated method stub
		olist.remove(o);
	}

	@Override
	protected void print() {
		System.out.println("=====================");
		System.out.println(getName() + " ------------------ ");
		for(OriganizationComponent o : olist) {
			System.out.println(o.getName());
		}
	}
	
	

}

public class Department extends OriganizationComponent {

	List&lt;OriganizationComponent&gt; olist= new ArrayList&lt;&gt;();

	public Department(String name, String intro) {
		super(name, intro);
	}

	@Override
	protected void add(OriganizationComponent o) {
		olist.add(o);
	}

	@Override
	protected void remove(OriganizationComponent o) {
		olist.remove(o);
	}

	@Override
	protected void print() {
		// TODO Auto-generated method stub
		System.out.println("----===----===---===-----");
		System.out.println(getName() +" Department");
		for(OriganizationComponent o: olist) System.out.println(o.getName());
	}

}</code></pre>
</div>
<h4 id="总结-3" class="source-line" data-source-line="1416">总结</h4>
<p class="source-line" data-source-line="1418">跟意思差不多，不过是组合关系。就像人没有心脏是不能活的这种强依赖关系，而形成的组成模式。</p>
<h3 id="外观模式" class="source-line" data-source-line="1421">外观模式</h3>
<p class="source-line" data-source-line="1423">也是组合的操作。将很多类组合，然后这些类的操作都是统一有条件的操作，是有流程的。</p>
<p class="source-line" data-source-line="1425">这里的例子非常好理解就是电影院，把各个模块的类，放到电影院，然后只需要操作电影院这个类暴露出来的接口就行了。</p>
<p class="source-line" data-source-line="1427">让我写个简单的例子。</p>
<div class="code-toolbar">
<pre class="language-java line-numbers highlighter-hljs"><code>
public class MovieFacade {
	
	PersonelComputer personelComputer;
	Screen screen;
	
	public MovieFacade(PersonelComputer personelComputer, Screen screen) {
		super();
		this.personelComputer = personelComputer;
		this.screen = screen;
	}

	public void ready() {
		System.out.println("观影准备");
		personelComputer.on();
		screen.down();
		System.out.println("\n\n\n");
	}
	
	public void end() {
		System.out.println(" 观影结束 ");
		personelComputer.off();
		screen.up();
		System.out.println("\n\n\n");
	}
	
}


public class TestMovieFacade {
	
	@Test
	public void testMovieFacade() {
		MovieFacade mf = new MovieFacade(new PersonelComputer(), new Screen());
		mf.ready();
		mf.end();
	}
}</code></pre>
</div>
<h4 id="总结-4" class="source-line" data-source-line="1473">总结</h4>
<p class="source-line" data-source-line="1475">外观模式的注意事项和细节：</p>
<ol>
<li class="source-line" data-source-line="1477">外观模式对外屏蔽了子系统的细节，因此外观模式降低了客户端对子系统的复杂性</li>
<li class="source-line" data-source-line="1478">外观模式对客户端与子系统的耦合关系，让子系统的内部的模块更易维护和扩展</li>
<li class="source-line" data-source-line="1479">通过合理的使用外观模式，可以帮我们更好的划分访问的层次</li>
<li class="source-line" data-source-line="1480">当系统需求进行<strong>分层设计</strong>时，可以考虑使用Facade模式</li>
<li class="source-line" data-source-line="1481">在维护一个遗留大型系统时，此是可以考虑将难以为扩展的类用一个Facade来实现，让新系统与Facade类交互，提高复用性</li>
<li class="source-line" data-source-line="1482">不能过多的或者不合理的使用外观模式，使用外观模式好，还是直接调用模块好，要让系统更有层次，利于维护为目的。</li>
</ol>
<h3 id="享元模式" class="source-line" data-source-line="1485">享元模式</h3>
<p class="source-line" data-source-line="1487">就是大家一起共享一些资源，这些资源通常是经常使用，而且模块独立性高。</p>
<div class="code-toolbar">
<pre class="language-java line-numbers highlighter-hljs"><code>
public class Client {

	@Test
	public void testWebSiteFactory() {
		WebSiteFactory wsf = new WebSiteFactory();

		WebSite wsbd = wsf.getWebsite("百度");
		wsbd.use(new User().setName("Mark"));

		WebSite wstm = wsf.getWebsite("天猫");
		wstm.use(new User().setName("Tony"));

		WebSite wsjk = wsf.getWebsite("天猫");
		wsjk.use(new User().setName("Jerk"));
	}
}


public class ConcreteWebsite extends WebSite {

	private String type = "";

	@Override
	public void use(User user) {
		// TODO Auto-generated method stub
		System.out.println("发布形式为: "+ type+" "+this.hashCode() +" User : "+ user.getName());
	}

	public ConcreteWebsite(String type) {
		super();
		this.type = type;
	}

	
	
}


public class User {

	private String name;

	public String getName() {
		return name;
	}

	public User setName(String name) {
		this.name = name;
		return this;
	}
	
	
}

public abstract class WebSite {

	public abstract void use(User user);
}


public class WebSiteFactory {

	private HashMap&lt;String,ConcreteWebsite&gt; pool = new HashMap&lt;&gt;();
	
	public WebSite getWebsite(String type) {
		if(!pool.containsKey(type)) {
			pool.put(type, new ConcreteWebsite(type));
		}
		return pool.get(type);
	}
	
	public int getWebSiteCount() {
		return pool.size();
	}
}</code></pre>
</div>
<p class="source-line" data-source-line="1570">执行结果如下:</p>
<div class="code-toolbar">
<pre class="language-txt line-numbers highlighter-hljs"><code>发布形式为: 百度 1466073198 User : Mark
发布形式为: 天猫 398690014 User : Tony
发布形式为: 天猫 398690014 User : Jerk</code></pre>
</div>
<h4 id="总结-5" class="source-line" data-source-line="1578">总结</h4>
<p class="source-line" data-source-line="1580">享元模式有点 像线程池的概念，&ldquo;享&ldquo;表示共享，&ldquo;元&rdquo;表示对象。</p>
<p class="source-line" data-source-line="1582">系统中有大量对象，这些对象消耗大量内存，并且对象的状态大部分可以外部化时，我们就可以考虑选用享元模式。</p>
<p class="source-line" data-source-line="1584">用唯一标识码判断，如果在内存中有，则返回这个唯一标识码所标识的对象，用HashMap/HashTable存储。</p>
<p class="source-line" data-source-line="1586">享元模式提高了系统的复杂度，需要分享出内部的状态和外部状态，而外部状态具有固化特性，不应该随着内部状态的改变而改变，<strong>这是需要注意的地方</strong></p>
<p class="source-line" data-source-line="1588">使用享元模式时，注意划分内部状态和外部状态，并且需要有一个工厂类加以控制</p>
<p class="source-line" data-source-line="1590">享元模式经典的应用场景是需要缓冲池的场景，比如String常量池，数据库连接池。</p>
<h3 id="代理模式" class="source-line" data-source-line="1592">代理模式</h3>
<p class="source-line" data-source-line="1594">不直接使用一个对象，而是间接的使用一个对接，在这个间接的过程中可以添加很多的操作。</p>
<h4 id="静态代理" class="source-line" data-source-line="1596">静态代理</h4>
<p class="source-line" data-source-line="1598">这里的具体操作就是，将一个具有<strong>普遍性的方法</strong>，用代理来扩展，如果不具有普遍性，则依然是用其本身的功能。</p>
<div class="code-toolbar">
<pre class="language-java line-numbers highlighter-hljs"><code>public class StaticProxy {
	interface ITeacherDao {

		void teach();
	}

	static class TeacherDao implements ITeacherDao {

		@Override
		public void teach() {
			System.out.println(" Teacher Dao ");
		}
	}

	static class TeacherDaoProxy implements ITeacherDao {

		private ITeacherDao teacherDao;

		public TeacherDaoProxy(ITeacherDao teacherDao) {
			this.teacherDao = teacherDao;
		}

		@Override
		public void teach() {
			System.out.println("开始自己定义的代理代码 ---- ");
			teacherDao.teach();
			System.out.println("结束代理代码          ----");
		}

	}
}


public class TestProxy {
	@Test
	public void testStaticProxy() {
		StaticProxy.TeacherDaoProxy stdp = new StaticProxy.TeacherDaoProxy(new StaticProxy.TeacherDao());
		stdp.teach();
	}

}</code></pre>
</div>
<h4 id="动态代理" class="source-line" data-source-line="1647">动态代理</h4>
<p class="source-line" data-source-line="1649">这个呢，很像Mybatis的操作，就是用动态代理实例化一个接口。</p>
<p class="source-line" data-source-line="1651">当然这个作用还可以是给一个类加上其他功能，下面的代码中就是给已经的实现的teach再加了一些代码。这类操作可以用来做一个方法的事务管理。如果在动态代理中执行失误了，就回撤数据，如果没有问题就放行。</p>
<p class="source-line" data-source-line="1653">在尚硅谷这里的学习收获非常大。</p>
<div class="code-toolbar">
<pre class="language-java line-numbers highlighter-hljs"><code>

public interface ITeacherDao {
	
	void teach();

}



public class ProxyFactory&lt;T&gt; {

	T target;
	
	public ProxyFactory(T target) {
		this.target = target;
	}
	
	
	
	public ProxyFactory() {
	}



	public &lt;T&gt; T getProxyInstance(){
		if(target == null) {
			throw new RuntimeException("Target 不能为空");
		}
		
		Object resultProxy= Proxy.newProxyInstance(target.getClass().getClassLoader(),target.getClass().getInterfaces() ,
				new InvocationHandler() {

					@Override
					public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
						System.out.println("代理代码   -----");
						// 调用 
						Object invokeObject = method.invoke(target, args);

						System.out.println("代理结束   -----");
						return invokeObject;
					}
			
		});
		return (T)resultProxy;
	}

	
	/**
	 * 这个就有点Mybatis的感觉了
	 * @param &lt;T&gt;
	 * @param targetClass
	 * @return
	 */
	public &lt;T&gt; T getInterfaceProxyInstance(Class targetClass) {

		Class[] clist = {targetClass};

		Object resultProxy = Proxy.newProxyInstance(targetClass.getClassLoader(),clist,
				new InvocationHandler() {

					@Override
					public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
						System.out.println("代理代码   -----");
						
						System.out.println(" 我直接拿到注解 的代码，进行查询就行");

						System.out.println("代理结束   -----");
						return null;
					}
			
		});

		return (T) resultProxy;
	}

}


public class TeacherDao implements ITeacherDao{

	@Override
	public void teach() {
		System.out.println(" Teahcer teach the teahced");
	}

}

public class TestDynamicProxy {

	@Test
	public void testDynamicProxy() {
		ITeacherDao teacherDao = new TeacherDao();
		ITeacherDao itdProxy = new ProxyFactory&lt;ITeacherDao&gt;(teacherDao).getProxyInstance();
		itdProxy.teach();
	}
	
	@Test
	public void testDynamicInterfaceProxy() {
		ITeacherDao teacherProxy = new ProxyFactory&lt;ITeacherDao&gt;().getInterfaceProxyInstance(ITeacherDao.class);
		teacherProxy.teach();
	}
}</code></pre>
</div>
<h4 id="cglib代理" class="source-line" data-source-line="1763">Cglib代理</h4>
<ol>
<li class="source-line" data-source-line="1765">静态代理 和 JDK代理模式都要求目标对象是实现一个接口，但有时候对象只是一个单独的对象，并没有实现任何的接口，这个蚨可以使用<strong>目标对象子类</strong>来实现代理 - 这就是Cglib代理。</li>
<li class="source-line" data-source-line="1766">Cglib代理也叫作子类代理，它是在内存中构建一个子类对象从而实现对目标对象功能扩展，有些书将Cglib代理归到动态代理</li>
<li class="source-line" data-source-line="1767">Cglib是一个强大的高性能的代码生成包，它可以在运行期扩展Java与实现Java接口，它广泛的被许多AOP的框架使用，SpringAOP，实现方法拦截</li>
<li class="source-line" data-source-line="1768">在AOP编程中，如何选择代理模式：
<ol>
<li class="source-line" data-source-line="1769">目标对象需要实现接口，用JDK代理</li>
<li class="source-line" data-source-line="1770">目标对象不需要实现接口，Cglib代理</li>
</ol>
</li>
<li class="source-line" data-source-line="1771">Cglib包的底层是通过使用字节码处理框架ASM来转换字节码并生成新的类</li>
</ol>
<p class="source-line" data-source-line="1773">下面的代码跑起来需要cblig和asm的库，建议用Maven项目跑，(是这样写的，但我没跑起来，不打算试了。)后面用到的时候肯定能解决问题的。</p>
<div class="code-toolbar">
<pre class="language-java line-numbers highlighter-hljs"><code>



public class ProxyFactory implements MethodInterceptor{

	private Object target;
	
	public ProxyFactory(Object target) {
		this.target = target;
	}
	
	public Object getProxyInstance() {
		Enhancer enhancer =new Enhancer();
		// 设置 基类
		enhancer.setSuperclass(target.getClass());
		// 设置 拦截 对象，就是实现拦截方法的对象
		enhancer.setCallback(this);
		return enhancer.create();
	}


	@Override
	public Object intercept(Object arg0, Method method, Object[] arg2, MethodProxy arg3) throws Throwable {
		System.out.println("Cglib 开始了 ~~~ ");
		// TODO Auto-generated method stub
		Object result = method.invoke(target, arg3);
		System.out.println("Cglib 结束了 ~~~ ");
		return result;
	}

}


public class TeacherDao {

	void teach() {
		System.out.println("Cglib Proxy AOP 动态");
	}

}


public class TestCglib {
	
	
	@Test
	public void testCglib() {
		
		
		TeacherDao td = new TeacherDao();
		TeacherDao proxyDao = (TeacherDao)new ProxyFactory(td).getProxyInstance();
		proxyDao.teach();
		
	}

}</code></pre>
</div>
<h4 id="总结-6" class="source-line" data-source-line="1838">总结</h4>
<img src="https://img2023.cnblogs.com/blog/2146100/202303/2146100-20230325124208649-8020139.png" alt="" class="vx-image-view-image" />
<h5 id="其他代理方法" class="source-line" data-source-line="1844">其他代理方法</h5>
<p class="source-line" data-source-line="1845">除了静态代理、动态代理、Cglib代理外，还有几种变体</p>
<p class="source-line" data-source-line="1847">防火墙代理：内网通过代理穿透防火墙，实现对公网的访问。</p>
<p class="source-line" data-source-line="1849">缓存代理：当请求图片文件等资源时，先到缓存代理取，有则返回，没有则到公网或数据库里取，然后缓存(到时候写缓存的时候可以用)</p>
<p class="source-line" data-source-line="1851">远程代理：远程对象的本地代表，通过它可以把远程对象当本地对象来调用，远程代理通过网络和真正的远程对象沟通信息。（RPC？Feign？）</p>
<p class="source-line" data-source-line="1853">同步代理，主要使用在多线程中，完成多线程间同步工作。</p>
<h2 id="行为型" class="source-line" data-source-line="1856">行为型</h2>
<h3 id="模板方法" class="source-line" data-source-line="1858">模板方法</h3>
<p class="source-line" data-source-line="1860">用我的话来说就是一些特定的模块，可能需要自定义一些算法，这些自定义的算法需要你根据你的使用场景进行自定义。而且这些实现模块的类，仅是一些小差别，如果差异太大，可能不适合这个模块方法。</p>
<p class="source-line" data-source-line="1862">AbstractClass 抽象类，类中实现了模板方法(template)，定义了算法的骨架，具体子类需要去实现，其它的抽象方法</p>
<p class="source-line" data-source-line="1864">ConcreteClass 实现抽象方法，以完成算法中特点子类的步骤</p>
<img src="https://img2023.cnblogs.com/blog/2146100/202303/2146100-20230325124208566-1585926899.png" alt="" class="vx-image-view-image" />
<div class="code-toolbar">
<pre class="language-java line-numbers highlighter-hljs"><code>
public class PeanutSoyaMilk extends SoyaMilk{

	@Override
	void addMetiral() {
		System.out.println("第二步： 加花生");
	}

}


public class PureSoyaMilk extends SoyaMilk{
	
	boolean addMeterial;
	
	public PureSoyaMilk(boolean addMeterail) {
		this.addMeterial = addMeterail;
	}

	@Override
	void addMetiral() {
		System.out.println("第二步：加给");
	}

	@Override
	boolean customerWant() {
		return addMeterial;
	}
	
	

}

public class ReadBeanSoyaMilk extends SoyaMilk{

	@Override
	void addMetiral() {
		System.out.println("第二步： 加红豆");
	}

}

public abstract class SoyaMilk {

	final void make() {
		select();
		if(customerWant()) {
			addMetiral();
		}
		soak();
		beat();
	}
	
	void select() {
		System.out.println("第一步：选豆");
	}
	
	abstract void addMetiral();
	
	void soak() {
		System.out.println("第三：浸泡");
	}
	
	void beat() {
		System.out.println("第四：研磨");
	}
	
	// 这玩意就叫作钩子，可以自定义，但对其他代码没有影响
	boolean customerWant() {
		return true;
	}
}

public class TestSoyaMilk {

	
	@Test
	public void testSoyaMilk() {
		
		System.out.println("花生牛奶 ~~~ ");
		SoyaMilk peanut = new PeanutSoyaMilk();
		peanut.make();
		
		System.out.println("\n\n\n 红豆牛奶 ~~~ ");
		SoyaMilk redBean= new ReadBeanSoyaMilk();
		redBean.make();

		System.out.println("\n\n\n 纯大豆蛋白 ~~~ ");
		SoyaMilk pure = new PureSoyaMilk(false);
		pure.make();
		
		
	}
}</code></pre>
</div>
<h4 id="总结-7" class="source-line" data-source-line="1967">总结</h4>
<p class="source-line" data-source-line="1969">这是尚硅谷的总结</p>
<p class="source-line" data-source-line="1971">模板方法的注意事项和细节：</p>
<ol>
<li class="source-line" data-source-line="1973">基本思想是：算法只存在于一个地方，也就是父类中，容易修改，需要修改算法时，只要修改父类的模板方法或者已经实现的某些步骤，子类就会继承这些修改</li>
<li class="source-line" data-source-line="1974">实现了最大化代码复用，父类的模板方法和已实现的某些步骤会被子类继承而直接使用</li>
<li class="source-line" data-source-line="1975">即统一了算法，也提供了很大的灵活性，父类的模板方法确保了算法的结构保持不变，同时由子类提供部分步骤的实现</li>
<li class="source-line" data-source-line="1976">该模式的不足之处，每一个不同的实现都需要一个子类实现，导致类的个数增加，使得系统更加庞大。</li>
<li class="source-line" data-source-line="1977">一般模板方法都加上<strong>final</strong>关键字，防止子类重写模板方法</li>
<li class="source-line" data-source-line="1978">模板方法模式使用场景：当要完成在某个过程，该过程要执行一系列步骤，这一系统的步骤基本相同，但其个别步骤在实现时可能不同，通常考虑用模板方法模式来处理</li>
</ol>
<h3 id="命令模式" class="source-line" data-source-line="1981">命令模式</h3>
<img src="https://img2023.cnblogs.com/blog/2146100/202303/2146100-20230325124208860-1636510256.png" alt="" class="vx-image-view-image" />
<div class="code-toolbar">
<pre class="language-java line-numbers highlighter-hljs"><code>
public interface Command {
	
	void execute();
	
	void undo();

}


public class TestCommand {
	
	@Test
	public void testCommand() {
		
		LightReceiver lightReceiver = new LightReceiver();
		
		LightOnCommand onCommand = new LightOnCommand(lightReceiver);
		LightOffCommand offCommand = new LightOffCommand(lightReceiver);
		
		// 新建一个遥控器
		RemoteController remoteController = new RemoteController();
		
		// offCommand 和 onCommand是 分别执行的操作，但我觉得后面用这个写一个平台的时候，可以用多种方式，而不是
		// 而不是这种true or false的形式
		remoteController.setCommand(0, onCommand, offCommand);
		
		remoteController.onButtonWasPushed(0);
		
		remoteController.undoButtonWasPushed();
		
		remoteController.offButtonWasPushed(0);
		
		remoteController.undoButtonWasPushed();
		
		
		// 这里的热销逻辑是，将每次使用的命令保存为全局变量，每次撤销直接使用全局变量即可 
		
	}

}

public class RemoteController {

	
	Command[] offCommands;
	Command[] onCommands;
	
	// 这就是一个临时的引用 
	Command undoCommand;

	public RemoteController() {
		offCommands = new Command[5];
		onCommands = new Command[5];
		
		for (int i = 0; i &lt; 5; i++) {
			offCommands[i] = new NoCommand();
			onCommands[i] = new NoCommand();
		}
	}
	
	public void setCommand(int no,Command onCommand, Command offCommand) {
		onCommands[no] = onCommand;
		offCommands[no] = offCommand;
	}
	
	public void onButtonWasPushed(int no) {
		onCommands[no].execute();
		undoCommand = onCommands[no];
	}

	public void offButtonWasPushed(int no) {
		offCommands[no].execute();
		undoCommand = offCommands[no];
	}
	
	public void undoButtonWasPushed() {
		undoCommand.undo();
	}
	
	
	
}

public class LightOffCommand implements Command {
	
	LightReceiver receiver;

	
	public LightOffCommand(LightReceiver receiver) {
		super();
		this.receiver = receiver;
	}

	@Override
	public void execute() {
		// TODO Auto-generated method stub
		receiver.off();
	}

	@Override
	public void undo() {
		// TODO Auto-generated method stub
		receiver.on();
	}

}

public class LightOnCommand implements Command {
	
	LightReceiver receiver;

	public LightOnCommand(LightReceiver receiver) {
		super();
		this.receiver = receiver;
	}

	@Override
	public void execute() {
		// TODO Auto-generated method stub
		receiver.on();
	}

	@Override
	public void undo() {
		// TODO Auto-generated method stub
		receiver.off();
	}

}

/**
 * 没有任何操作，省去了判断为空的操作，反正啥也不做
 * @author Administrator
 *
 */
public class NoCommand implements Command {

	@Override
	public void execute() {
		// TODO Auto-generated method stub

	}

	@Override
	public void undo() {
		// TODO Auto-generated method stub

	}

}


/**
 * 灯指令执行者，可能在单词上有语义问题
 * @author Administrator
 *
 */
public class LightReceiver {
	
	public void on() {
		System.out.println(" ~~ 开灯 ~~ ");
	}
	
	public void off() {
		System.out.println(" ~~ 关灯 ~~ ");
	}

}</code></pre>
</div>
<h4 id="springjdbc-template" class="source-line" data-source-line="2160">SpringJDBC Template</h4>
<p class="source-line" data-source-line="2162">也使用了命令模式，不过使用的是内部类来实现，那具体的执行都放在内部类里实现。<br />（这里我在思考性能的问题，我从未从匿名内部类的角度思考过问题。）</p>
<h4 id="总结-8" class="source-line" data-source-line="2165">总结</h4>
<p class="source-line" data-source-line="2167">我的理解：</p>
<ol>
<li class="source-line" data-source-line="2169">
<p class="source-line" data-source-line="2169">命令设计模式就是把命令组合的可能一个一个实现，然后聚合到一起使用。一个命令一个类，灯的开和关直接是两个类。所以在类的方面是有点小麻烦，命令越多，可能会突出庞大的结构性。但维护起来是有依据的，非常清晰。</p>
</li>
<li class="source-line" data-source-line="2171">
<p class="source-line" data-source-line="2171">可以做什么？ 可以用来做一个集中的类似于本地版本的消息队列。给中心发送处理的命令，然后其调用相关的方法即可。其实很像是一个消息队列。</p>
</li>
</ol>
<p class="source-line" data-source-line="2173">尚硅谷韩老师的理解：</p>
<ul>
<li class="source-line" data-source-line="2175">将发起请求的对象与执行请求的对象解耦，发起请求的对象是调用者，调用者只要调用命令对象的execute()方法就可以让接收者工作，而不必知道具体的接收者对象是谁、是如何实现的，命令对象会负责让接收者执行请求的动作，也就是说：&ldquo;请求发起者&rdquo;和&ldquo;请求执行者&rdquo;之间的解是通过命令的对象实现的，命令对象起到了纽带桥梁的作用</li>
<li class="source-line" data-source-line="2176">容易设计一个命令队列，只要把命令对象放到列队，就可以多纯种的执行命令（消息队列）</li>
<li class="source-line" data-source-line="2177">容易实现对请求的撤销和重做</li>
<li class="source-line" data-source-line="2178"><strong>命令模式不足</strong>：可能导致某些有过多的具体命令类，增加了系统的复杂度，这点在使用时候要注意</li>
<li class="source-line" data-source-line="2179">空命令是也是一种设计模式，它为我们省去了判空的操作，在上面的实例中，如果没有用空命令，我们每按下一个按键都要判空，这给我们编码带来一定的麻烦。</li>
<li class="source-line" data-source-line="2180">命令模式经典的应用场景，界面的一个按钮都是一条命令、模拟CMD（DOS）命令订单撤销/恢复、触发反馈机制。</li>
</ul>
<h3 id="访问者模式" class="source-line" data-source-line="2184">访问者模式</h3>
<p class="source-line" data-source-line="2186">(没看懂应用场景，总之就是设定一个对象数组，然后添加操作，然后这个对象数组全部执行同一个操作。)</p>
<p class="source-line" data-source-line="2188">可能意思就是，以Visitor去操作Element，而不是以数据结构和客户端去操作 Element。</p>
<p class="source-line" data-source-line="2190">用的是依赖倒转，做的是一种业务隔离，使用于数据结构非常稳定的系统。（那岂不是适用于做服务器核心状态）</p>
<img src="https://img2023.cnblogs.com/blog/2146100/202303/2146100-20230325124208799-1533384621.png" alt="" class="vx-image-view-image" />
<div class="code-toolbar">
<pre class="language-java line-numbers highlighter-hljs"><code>public abstract class Action {
	
	public abstract void getManResult(Man man);

	public abstract void getWomanResult(Woman woman);
	

}

public class Fail extends Action{

	@Override
	public void getManResult(Man man) {
		System.out.println("Fail Man");
	}

	@Override
	public void getWomanResult(Woman woman) {
		System.out.println("Fail woman");
	}

}

public class Man extends Person{ 

	@Override
	public void accept(Action action) {
		action.getManResult(this);
	}

}

public class ObjectStructure {

	private List&lt;Person&gt; persons = new LinkedList&lt;&gt;();
	
	public void attach(Person p) {
		persons.add(p);
	}
	
	public void detach(Person p) {
		persons.remove(p);
	}
	
	public void display(Action action) {
		for(Person p: persons) {
			p.accept(action);
		}
	}

}

public abstract class Person {
	
	public abstract void accept(Action action);
}

public class Sucess extends Action{

	@Override
	public void getManResult(Man man) {
		System.out.println("Sucess Man ~~ ");
	}

	@Override
	public void getWomanResult(Woman woman) {
		System.out.println("Sucess Woman ~~");
	}

}

public class TestClient {

	
	@Test
	public void testVisitor() {
		ObjectStructure os = new ObjectStructure();
		os.attach(new Man());
		os.attach(new Woman());
		os.attach(new Man());
		
		os.display(new Sucess());

		
		System.out.println("~~~~~");
		os.display(new Fail());
	}
}

// 这里使用了双分派，即首先在客户端中，将具体状态作为参数传递Woman中(第一次分派）
// 2. 然后Woman 类调用作为参数的&ldquo;具体方法&rdquo;中方法getWomanResult，同时将自己this作为参数
// 传入，完成第二次分派
public class Woman extends Person{

	@Override
	public void accept(Action action) {
		action.getWomanResult(this);
	}

}</code></pre>
</div>
<h4 id="总结-9" class="source-line" data-source-line="2298">总结</h4>
<p class="source-line" data-source-line="2300">访问者模式的注意事项和细节：</p>
<p class="source-line" data-source-line="2302">优点：</p>
<ol>
<li class="source-line" data-source-line="2304">访问者模式符合单一职责原则、让程序具有优秀的扩展性、灵活性非常高</li>
<li class="source-line" data-source-line="2305">访问者模式可以对功能进行统一，可以做报表、UI、拦截器与过滤器，适用于数据结构相对稳定的系统</li>
</ol>
<p class="source-line" data-source-line="2307">缺点</p>
<ol>
<li class="source-line" data-source-line="2309">具体元素对访问者公布细节，也就是说访问者关注了其他类的内部细节，这是迪米特法则所不建议的，这样造成了具体元素变更比较困难。</li>
<li class="source-line" data-source-line="2310">违背了依赖倒转原则，访问者依赖的是具体元素，而不是抽象元素</li>
<li class="source-line" data-source-line="2311">因此，如果一个系统有比较<strong>稳定的数据结构，又有经常变化的功能需求，那么访问者模式</strong>就是比较合适的。</li>
</ol>
<p class="source-line" data-source-line="2315">讲数据结构与操作分离，使用访问者相当于将一些对象具有统一操作的，像 商品（不同的类型），像 过滤器（不同的层面），等等。这些被聚合的对象都需要对外开放自自己，并且使用访问者的this指针直接来调用自己。</p>
<p class="source-line" data-source-line="2317">这个调用呢是直接讲访问者传入 元素中，可视为元素开放了自己的VISIT接口。</p>
<p class="source-line" data-source-line="2319">访问者重载了很多关于 不同类型元素的visit方法，这样可以整合很多类型，且不需要修改数据结构和操作。只需要将新添加的类型元素以这种试工，继续添加到数组中即可。</p>
<h3 id="迭代器模式" class="source-line" data-source-line="2321">迭代器模式</h3>
<p class="source-line" data-source-line="2323">迭代器模式最早使用在Collection的时候，是使用过这个Iterator的，这里的教的也是继承Iterator用数组做自己的集合。</p>
<p class="source-line" data-source-line="2325">即是使用迭代器，又是使用迭代模式。</p>
<p class="source-line" data-source-line="2327">思想就是为每一个聚合到主类中的类，是一集合，所以需要为其实现一个迭代器，在使用时，就不需要直接使用List，而是使用迭代器。</p>
<h4 id="基本介绍" class="source-line" data-source-line="2331">基本介绍</h4>
<p class="source-line" data-source-line="2333">迭代器模式（Interator Pattern)是常用 设计模式，属于行为模式。<br />如果我们的集合元素是用不同的方式实现的，有数组还有Java集合类，或者还有其他方式，当客户端要遍历这些集合元素的时候要使用多种遍历方式，而且还会暴露元素的内部结构，可以考虑使用迭代器模式解决。</p>
<p class="source-line" data-source-line="2336">迭代器模式，提供一种遍历集合元素的统一接口，用一致的方法遍历集合元素，不需要知道集合对象的底层表示。不暴露其内部的结构。</p>
<img src="https://img2023.cnblogs.com/blog/2146100/202303/2146100-20230325124208725-1128839685.png" alt="" class="vx-image-view-image" />
<div class="code-toolbar">
<pre class="language-java line-numbers highlighter-hljs"><code>public interface College {
	
	public String getName();
	
	/**
	 * 增加系的方法 
	 * @param name
	 * @param desc
	 */
	public void addDepartment(String name,String desc);
	
	/**
	 * 返回一个跌代器
	 * @return
	 */
	public Iterator createIterator();

}

public class ComputerCollege implements College{
	
	Department[] departments;
	int departNum = 0; // 保存当前数组对象个数

	@Override
	public String getName() {
		// TODO Auto-generated method stub
		return "计算机学院";
	}

	@Override
	public void addDepartment(String name, String desc) {
		Department department =  new Department(name,desc);
		// 添加后需要 将 索引往后移位
		departments[departNum++] = department;
	}


	public ComputerCollege() {
		departments = new Department[5];
		addDepartment("Java程序开发","Java程序开发");
		addDepartment("PHP程序开发","PHP程序开发 ");
		addDepartment("PornHub程序员","PornHub程序员");
	}

	@Override
	public Iterator createIterator() {
		return new ComputerCollegeInterator(departments);
	}
	

	

}

public class ComputerCollegeInterator implements Iterator{
	
	Department[] departments;
	int position = 0;
	
	public ComputerCollegeInterator(Department[]departments) {
		this.departments = departments;
	}

	// 判断是否有下一个元素 
	@Override
	public boolean hasNext() {
		if(position &gt;= departments.length || departments[position] == null) {
			return false;
		}else {
			return true;
		}
	}

	@Override
	public Department next() {
		return departments[position++];
	}
	
	/**
	 * 空实现
	 */
	public void remove() {
		
	}

}

public class Department {
	private String name;
	private String desc;
	public Department(String name, String desc) {
		super();
		this.name = name;
		this.desc = desc;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDesc() {
		return desc;
	}
	public void setDesc(String desc) {
		this.desc = desc;
	}

}

public class InfoCollege implements College{
	
	List&lt;Department&gt; departments;
	
	public InfoCollege() {
		departments = new ArrayList&lt;Department&gt;();
		addDepartment("网络安全","网络安全");
		addDepartment("逆向工程","逆向工程");
		addDepartment("Script Boy","Script Boy");
	}

	@Override
	public String getName() {
		return "信息学院";
	}

	@Override
	public void addDepartment(String name, String desc) {
		departments.add(new Department(name,desc));
	}

	@Override
	public Iterator createIterator() {
		return new InfoCollegeIterator(departments);
	}

}

public class InfoCollegeIterator implements Iterator{
	
	// 为了突显  InfoCollege与 ComputerCollege的差异，这里直接使用List存放 Department
	List&lt;Department&gt; departments;
	int index = -1;

	public InfoCollegeIterator(List&lt;Department&gt; departments) {
		super();
		this.departments = departments;
	}

	/**
	 * 需要明白这个方法是做什么的，hastNext，就是判断是否有下一个元素
	 * 这里的操作是 判断 index是否大于最大索引，如果不大于则index++，并且说明有下一个元素
	 * 也就是index不是最后一个元素，都是没有问题的
	 * index 默认是 -1 ，所以 index++，也保证了起始位置是 
	 * 
	 * 在获取next的时候，就不会对 index进行操作了
	 */
	@Override
	public boolean hasNext() {
		if(index &gt; departments.size() - 1) {
			return false;
		}
		index++;
		return true;
	}

	@Override
	public Object next() {
		return departments.get(index);
	}
	
	/**
	 * 空实现
	 */
	public void remove() {
		
	}

}

/**
 * 输出接口
 *  @author Administrator
 *
 */
public class OutputImpl {
	
	List&lt;College&gt; colleges;
	
	public OutputImpl(List&lt;College&gt; colleges) {
		this.colleges = colleges;
	}
	
	public void printColleges() {
		Iterator iterator = colleges.iterator();
		while(iterator.hasNext()) {
			College college = (College)iterator.next();
			System.out.println("College+&gt;&gt;&gt;&gt;"+college.getName());
			printDepartments(college.createIterator());
		}
		
	}
	
	public void printDepartments(Iterator iterator) {
		System.out.println(" ~~ Department ~~ ");
		while(iterator.hasNext()) {
			Department department = (Department) iterator.next();
			System.out.println(department.getName() + "~~~~ ");
		}
	}

}

public class TestIterator {

	@Test
	public void testIterator() {
		List&lt;College&gt; collegeList = new ArrayList&lt;&gt;();
		
		collegeList.add(new ComputerCollege());
		collegeList.add(new InfoCollege());
		
		OutputImpl outputImpl = new OutputImpl(collegeList);
		outputImpl.printColleges();

	}
}</code></pre>
</div>
<h4 id="总结-10" class="source-line" data-source-line="2573">总结</h4>
<p class="source-line" data-source-line="2575">迭代器模式的注意事项和细节</p>
<p class="source-line" data-source-line="2577">优点：</p>
<ol>
<li class="source-line" data-source-line="2579">提供一个统一的方法遍历对象，客户不用在考虑聚合的类型，使用一种方法就可以遍历对象了。</li>
<li class="source-line" data-source-line="2580">隐藏了对聚合的内部结构，客户端要遍历聚合时候只能取到迭代器，而不会知道聚合的具体组成</li>
<li class="source-line" data-source-line="2581">提供了一种设计思想，就是一个类应该只有一个引起变化的原因，在聚合类中，我们把迭代器分开，就是要把管理对象集合和遍历对象命令的责任分开，这样一来，集合改变的话，只影响聚合对象，而如果遍历方式改变的话，只影响到迭代器。</li>
<li class="source-line" data-source-line="2582">当要展示一组相似的对象时，或者遍历一组相同 对象 时使用，适合使用迭代器模式</li>
</ol>
<p class="source-line" data-source-line="2584">缺点</p>
<ul>
<li class="source-line" data-source-line="2586">每个聚合对象都要一个迭代器，会生成多个迭代器不好管理类。</li>
</ul>
<p class="source-line" data-source-line="2589">我的思考：<br />就是用迭代器来聚合一组相似的对象，然后操作差不多。而其只需要对外开放一个迭代器作为访问接口就可以了，不需要使用其他的方式进行操作数据。（像List内，有什么get 和 add）</p>
<p class="source-line" data-source-line="2592">而这个迭代器模式是自定义数据结构，然后对外开放迭代器，在使用时，仅需要拿到迭代器。</p>
<h3 id="观察者模式" class="source-line" data-source-line="2596">观察者模式</h3>
<p class="source-line" data-source-line="2598">传统的调用，直接是写死的。代码的耦合度非常高。</p>
<p class="source-line" data-source-line="2600">场景，订阅的信息场景。就是你只需要发送信息，不用在意实现，发送后，什么事都不管了。我写的例子，中就是一个中心控制器向其他构件的观察者发送信息。其实这个很像是一个订阅的业务。</p>
<p class="source-line" data-source-line="2602">代码层面，观察者会开放接口用来接收信息，然后订阅中心 ，就是Subject。Subject聚合了一些观察者。每当订阅中心接收到消息，都会发给观察者。然后观察者再做具体的实现。</p>
<img src="https://img2023.cnblogs.com/blog/2146100/202303/2146100-20230325124208581-1104432511.png" alt="" class="vx-image-view-image" />
<div class="code-toolbar">
<pre class="language-java line-numbers highlighter-hljs"><code>
public class TestObserver {
	
	@Test
	public void testObserver() {
		CenterController centerController= new CenterController();
		// 注册 服务器观察者
		centerController.registerObserver(new ServerObserver());
		// 注册 中心观察者
		centerController.registerObserver(new CenterObserver());
		
		Map&lt;String,String&gt; data= new HashMap&lt;&gt;();
		data.put("user","pphboy@qq.com");
		data.put("token", "asdfjasldkfjklasdjfkl");
		data.put("visit", "/user/login");
		data.put("message", " 同志 们 ，我们的天眼");
		data.put("weather", "{temperature: 39}");
		centerController.sendMessage(data);
	}

}


public class CenterObserver implements Observer{

	private Map&lt;String,String&gt; data;
	
	@Override
	public void update(Map&lt;String, String&gt; data) {
		this.data =data;
		display();
	}

	private void display() {
		System.out.println("\n "+getName());
		for(String key : data.keySet()) {
			System.out.println(key+" - " + data.get(key));
		}
	}
	
	public String getName() {
		return "中心观察者";
	}
}



/**
 * 观察者接口，由观察者来实现
 * @author Administrator
 *
 */
public interface Observer {
	
	public String getName();

	public void update(Map&lt;String,String&gt; data);

}

public class ServerObserver implements Observer {

	private Map&lt;String,String&gt; data;

	@Override
	public void update(Map&lt;String, String&gt; data) {
		this.data = data;
		display();
	}
	
	private void display() {
		System.out.println("\n "+getName());
		for(String key : data.keySet()) {
			System.out.println(key+":" + data.get(key));
		}
	}

	@Override
	public String getName() {
		// TODO Auto-generated method stub
		return "服务器注册中心";
	}
	
	
}


public class CenterController implements Subject{

	
	private Map&lt;String,String&gt; data;
	private ArrayList&lt;Observer&gt; observers;
	
	public CenterController() {
		observers = new ArrayList&lt;&gt;();
	}
	
	public void sendMessage(Map&lt;String,String&gt; data) {
		this.data = data;
		dataChange();
	}
	
	public void dataChange() {
		notifyObservers();
	}

	@Override
	public void registerObserver(Observer o) {
		observers.add(o);
	}

	@Override
	public void removeObserver(Observer o) {
		observers.remove(o);
	}

	@Override
	public void notifyObservers() {
		for(Observer tempObserver: observers) {
			tempObserver.update(data);
		}
	}
	
	

}



public interface Subject {
	
	public void registerObserver(Observer o);
	
	public void removeObserver(Observer o);
	
	public void notifyObservers();
}</code></pre>
</div>
<h4 id="总结-11" class="source-line" data-source-line="2749">总结</h4>
<ol>
<li class="source-line" data-source-line="2752">观察者模式设计后，会以集合的方式来管理用户（Observer），包括注册，移除和通知。</li>
<li class="source-line" data-source-line="2753">这样，我们增加观察者（这里可以理解成一个新的公告板），就不需要去修改核心类Subject的子类，遵守了OCP原则。</li>
</ol>
<p class="source-line" data-source-line="2755">总之就是类似于订阅的模式，但不限于此。</p>
<h3 id="中介者模式" class="source-line" data-source-line="2757">中介者模式</h3>
<p class="source-line" data-source-line="2760">中介者模式，用一个中介对象来封装一系列的对象交互，中介者使各个对象不需要地相互引用，从而使其耦合松散，而且可以独立地改变它们之间的交互</p>
<p class="source-line" data-source-line="2762">中介者模式属于行为模式，使代码易于维护</p>
<p class="source-line" data-source-line="2764">比如MVC模式C(Controller控制器) 是 M(Model模型)和 V(View视图)的中介者，在前后端交互时起到了中间人的作用。</p>
<p class="source-line" data-source-line="2766">下面的例子是我自己设计的，就是以服务中心为 一个 中介者，你只需要指定状态，然后让其 中介者用 指定的服务处理事情。</p>
<div class="code-toolbar">
<pre class="language-java line-numbers highlighter-hljs"><code>
public abstract class Mediator {

	public abstract void register(String cooleagueName, Service colleague);
	
	public abstract void getMessage(int stateChange, String colleagueName);
	
	public abstract void sendMessage();
}



public abstract class Service {
	
	private Mediator mediator;
	public String name;

	public Service(Mediator mediator, String name) {
		super();
		this.mediator = mediator;
		this.name = name;
	}

	public abstract void sendMessage(int stateChange);
	
	public Mediator getMediator() {
		return this.mediator;
	}
}


public class TestMediator {
	
	@Test
	public void testMediator() {
		ServiceCenterMediator scm = new ServiceCenterMediator();
		
		BroadcastService bs =  new BroadcastService(scm,"BroadcastService");
		AlarmService as = new AlarmService(scm,"AlarmService");
		SuccessService ss = new SuccessService(scm,"SuccessService");
		
		System.out.println(" ~~~~ ");
		// 发送一条成功的消息
		bs.sendBroadCast(BroadcastType.SUCCESS);
		
		System.out.println(" ~~~~ ");
		// 发送一条全局的消息
		bs.sendBroadCast(BroadcastType.ALL);
		System.out.println(" ~~~~ ");
		
		// 发送一条警告消息
		bs.sendBroadCast(BroadcastType.ALARM);
	}

}

/**
 * 发警告的服务 
 * @author Administrator
 *
 */
public class AlarmService extends Service{

	public AlarmService(Mediator mediator, String name) {
		super(mediator, name);
		mediator.register(name, this);
	}
	
	/**
	 * 自定义的发送方法
	 * @param stateChange
	 */
	public void sendAlarm(int stateChange) {
		sendMessage(stateChange);
	}

	@Override
	public void sendMessage(int stateChange) {
		// 调用中介的getMessage
		// 相当于 你send的Message被这个中介接收了
		this.getMediator().getMessage(stateChange, name);
	}
	
	public void sendAlarm() {
		System.out.println(" 向 所有  用户 发送 警告");
	}

}

public class BroadcastService extends Service{

	public BroadcastService(Mediator mediator, String name) {
		super(mediator, name);
		// 将此服务注册到 中介者中
		mediator.register(name, this);
	}
	
	public void sendBroadCast(BroadcastType type) {
		// type 只需要判断 数字就可以了
		sendMessage(type.getVal());
	}

	@Override
	public void sendMessage(int stateChange) {
		this.getMediator().getMessage(stateChange, name);
	}

}

public class SuccessService extends Service{

	public SuccessService(Mediator mediator, String name) {
		super(mediator, name);
		mediator.register(name, this);
	}
	
	public void sendSuccess(int state) {
		sendMessage(state);
	}

	@Override
	public void sendMessage(int stateChange) {
		this.getMediator().getMessage(stateChange, name);
	}
	
	public void sendSuccess() {
		System.out.println(" 向 用户 发送一条  成功的信息");
	}

}



public enum BroadcastType {
	
	ALL(400),
	ALARM(300),
	SUCCESS(200);

	private int val;
	
	private BroadcastType(int val){
		this.val = val;
	}

	public int getVal() {
		return val;
	}

	public void setVal(int val) {
		this.val = val;
	}
}

public class ServiceCenterMediator extends Mediator{
	
	// 存放  Service
	Map&lt;String,Service&gt; serviceMap;
	
	public ServiceCenterMediator() {
		serviceMap = new HashMap&lt;&gt;();
	}

	@Override
	public void register(String cooleagueName, Service colleague) {
		serviceMap.put(cooleagueName, colleague);
	}

	@Override
	public void getMessage(int state, String colleagueName) {
		Object temp = serviceMap.get(colleagueName);
		if(temp instanceof BroadcastService) {
			// 当状态为1时
			if(state == 400) {
				AlarmService as = (AlarmService)serviceMap.get("AlarmService");
				as.sendAlarm();
				SuccessService ss = (SuccessService)serviceMap.get("SuccessService");
				ss.sendSuccess();
			}else if(state == 200) {
				SuccessService ss = (SuccessService)serviceMap.get("SuccessService");
				ss.sendSuccess();
			}else if(state == 300) {
				AlarmService as = (AlarmService)serviceMap.get("AlarmService");
				as.sendAlarm();
			}
		}
		if(temp instanceof AlarmService) {
			AlarmService as = (AlarmService)temp;
		}

		if(temp instanceof SuccessService) {
			SuccessService as = (SuccessService)temp;
		}

	}

	/*
	 * 空方法，没有实现
	 */
	@Override
	public void sendMessage() {

	}

}</code></pre>
</div>
<h4 id="总结-12" class="source-line" data-source-line="2978">总结</h4>
<ol>
<li class="source-line" data-source-line="2980">多个类相互耦合，全形成网状结构，使用中介者模式将网状结构分离为星形结构，进行解耦</li>
<li class="source-line" data-source-line="2981">减少类间依赖，降低了耦合，符合迪米特原则</li>
<li class="source-line" data-source-line="2982">中介者承担了较多的责任，一量中介者出现了问题，整个系统就会受到影响</li>
<li class="source-line" data-source-line="2983">如果设计不当，中介者对象本身变得过于复杂，这点在实际 使用时，需要特别注意</li>
</ol>
<p class="source-line" data-source-line="2986">能不能 用中介者结合 命令模式来进行操作。</p>
<h3 id="备忘录模式" class="source-line" data-source-line="2990">备忘录模式</h3>
<p class="source-line" data-source-line="2993">记录某个对象当时的状态，在后面用于恢复。</p>
<p class="source-line" data-source-line="2995">（这个是不是可以用于做 服务状态的 保存和 恢复 ，记录服务运行的状态，然后用命令模式指定其恢复就可以了 ）</p>
<p class="source-line" data-source-line="2997">这里用的记录一个游戏的角色的状态，然后用于后面的恢复</p>
<p class="source-line" data-source-line="2999">很简单</p>
<div class="code-toolbar">
<pre class="language-java line-numbers highlighter-hljs"><code>
public class Caretaker {
	
	private Memento memento;

	public Memento getMemento() {
		return memento;
	}

	public void setMemento(Memento memento) {
		this.memento = memento;
	}

}

public class GameRole {

	private int def;
	private int vit;
	
	public int getDef() {
		return def;
	}
	public void setDef(int def) {
		this.def = def;
	}
	public int getVit() {
		return vit;
	}
	public void setVit(int vit) {
		this.vit = vit;
	}
	
	public Memento createMemento() {
		return new Memento(def,vit);
	}
	
	public void recoverMemento(Memento memento) {
		this.def = memento.getDef();
		this.vit = memento.getVit();
	}
	
	public void display() {
		System.out.printf("{def: %d, vit: %d}\n",def,vit);
	}
	public GameRole(int def, int vit) {
		super();
		this.def = def;
		this.vit = vit;
	}
	
}

public class Memento {

	private int def;
	private int vit;
	public Memento(int def, int vit) {
		super();
		this.def = def;
		this.vit = vit;
	}
	public int getDef() {
		return def;
	}
	public void setDef(int def) {
		this.def = def;
	}
	public int getVit() {
		return vit;
	}
	public void setVit(int vit) {
		this.vit = vit;
	}
	
}

public class TestMemento {
	
	@Test
	public void testMemento() throws InterruptedException {
		Caretaker caretaker = new Caretaker();
		
		GameRole gr = new GameRole(100,100);
		
		// 创建备忘录
		caretaker.setMemento(gr.createMemento());
		
		System.out.println("被攻击，和中毒了 ");
		// 被攻击
		gr.setDef(gr.getDef()- 10);
		// 中毒了
		gr.setVit(gr.getVit()-33);
		
		gr.display();
		
		System.out.println("恢复中....");
		Thread.sleep(1000);
		gr.recoverMemento(caretaker.getMemento());
		System.out.println("恢复完成");
		gr.display();
	}
}</code></pre>
</div>
<h4 id="总结-13" class="source-line" data-source-line="3108">总结</h4>
<ol>
<li class="source-line" data-source-line="3110">给用户提供了一种可以恢复状态的机制，可以使用户能够比较方便地回到原来的状态</li>
<li class="source-line" data-source-line="3111">实现了信息的封装，使得用户不需要关心状态的保存细节</li>
<li class="source-line" data-source-line="3112">如果类的成员变量过多，势必会战胜比较大的资源，而且每一次保存都会消耗一定的内存，对性能可能有一定的影响</li>
<li class="source-line" data-source-line="3113"><strong>应用场景： 1. 后悔药 2. 打游戏时存档 3. Windows 里的 Ctrl+Z ，4. IE 中的后退 5. 数据库的事务管理</strong></li>
<li class="source-line" data-source-line="3114">为了节约内存，备忘录模式可以和原型模式配合使用</li>
</ol>
<h3 id="解释器模式" class="source-line" data-source-line="3118">解释器模式</h3>
<h4 id="基本介绍-1" class="source-line" data-source-line="3120">基本介绍</h4>
<ol>
<li class="source-line" data-source-line="3122">在编译原理中，一个自述表达式通过<strong>词法分析</strong>形成词法单元，而后这些词法单元再通过语法分析器构建语法分析树，最终形成一颗抽象的语法分析树，这里的词法分析器和语法分析器都可以看做是解释器。</li>
<li class="source-line" data-source-line="3123">解释器模式：是指给人上语言（表达式），定义它的文法的一种表示，并定义一个解释器，使用该解释器来解释语言中的句子（表达式）</li>
<li class="source-line" data-source-line="3124">应用场景：
<ul>
<li class="source-line" data-source-line="3125">应用可以将一个需要解释执行的语言中的句子表示为一个抽象语法树</li>
<li class="source-line" data-source-line="3126">一些重复出现的问题可以用一种简单的语言来表达</li>
<li class="source-line" data-source-line="3127">一个简单的语法需要解释的场景</li>
</ul>
</li>
<li class="source-line" data-source-line="3128">编译器、运算表达式、正则表达式、机器人</li>
</ol>
<h4 id="实操" class="source-line" data-source-line="3131">实操</h4>
<p class="source-line" data-source-line="3133">解释器模式一般是需要对应去做一个解析一段 有意义的字符串做的事，像SPEL表达式，终端中输入 &ldquo;a+b*c&rdquo;类似的表达式。</p>
<p class="source-line" data-source-line="3135">其中的思想，主要是将一个表达式进行拆分。</p>
<p class="source-line" data-source-line="3137">这个其实难的是逻辑，就是说具体要做成怎么一件事，怎么拆分？一个表达式怎么拆分？拆分存储到对象中，然后在用的时候，进行计算。</p>
<p class="source-line" data-source-line="3139">存储在结构类似于一二叉树。计算用的是递归。</p>
<p class="source-line" data-source-line="3141">用来写自定义的一些命令是非常不错的，虽然工作量大，但也不至于连个思路都没有了。</p>
<h4 id="总结-14" class="source-line" data-source-line="3143">总结</h4>
<p class="source-line" data-source-line="3145">注意事项和细节：</p>
<ol>
<li class="source-line" data-source-line="3147">当有一个语言需要解释执行，可将语言中的句子表示为一个抽象语法树，就可以考虑使用解释器模式，让程序具有良好的扩展性</li>
<li class="source-line" data-source-line="3148">应用场景：编译器、运算表达式计算、正则表达式、机器人等</li>
<li class="source-line" data-source-line="3149">使用解释器可能带来的问题：解释器可能会引起类膨胀、解释器模式采用递归调用方法，将会导致高度非常复杂，效率可能降低。</li>
</ol>
<p class="source-line" data-source-line="3151">（没有金刚钻，不要揽瓷器活）</p>
<p class="source-line" data-source-line="3155">场景： 用于 对 终端，需要输入命令，这样就需要用到这个解释器模式，或者一些地方需要写一些脚本语言，也需要用到解释器模式，后面开发编程语言的时候是需要用到的。</p>
<h3 id="状态模式" class="source-line" data-source-line="3158">状态模式</h3>
<h4 id="代码实现" class="source-line" data-source-line="3163">代码实现</h4>
<p class="source-line" data-source-line="3164">下面的例子将围绕的是这样一个，抽奖的例子来写。（因为自创例子时间太久了 ，所以我还是保存了尚硅谷的例子。虽然有在单词方面有语义的差异。<br /><img src="https://img2023.cnblogs.com/blog/2146100/202303/2146100-20230325124208640-763596218.png" alt="" class="vx-image-view-image" /></p>
<div class="code-toolbar">
<pre class="language-java line-numbers highlighter-hljs"><code>
/**
 * 抽奖的状态应用类-投抽奖活动
 * 
 * @author Administrator
 *
 */
public class RaffleActivity {

	// state表示 当前活动的状态
	State state = null;
	// 奖品的数量
	int count = 0;
	
	// 组合 活动的 四个状态
	State noRaffleState = new NoRaffleState(this);
	State canRaffleState = new CanRaffleState(this);
	State dispenseState =   new DispenseState(this);
    State dispensOutState = new DispenseOutState(this);


	public RaffleActivity(int count) {
		super();
		this.state = getNoRaffleState();
		this.count = count;
//		this.state = 
	}
	
	/**
	 * 扣积分
	 */
	public void deduceMoney() {
		state.deduceMoney();
	}
	
	/**
	 * 抽奖
	 */
	public void raffle() {
		if(state.raffle()) {
			// 领取奖品
			state.dispensePrize();
		}
	}
	
	

	public State getNoRaffleState() {
		return noRaffleState;
	}

	public void setNoRaffleState(State noRaffleState) {
		this.noRaffleState = noRaffleState;
	}

	public State getCanRaffleState() {
		return canRaffleState;
	}

	public void setCanRaffleState(State canRaffleState) {
		this.canRaffleState = canRaffleState;
	}

	public State getDispenseState() {
		return dispenseState;
	}

	public void setDispenseState(State dispenseState) {
		this.dispenseState = dispenseState;
	}

	public State getDispensOutState() {
		return dispensOutState;
	}

	public void setDispensOutState(State dispensOutState) {
		this.dispensOutState = dispensOutState;
	}

	public State getState() {
		return state;
	}

	public void setState(State state) {
		this.state = state;
	}

	public int getCount() {
		int t = count;
		System.out.println("count: "+t);
		count--;
		return t;
	}

	public void setCount(int count) {
		this.count = count;
	}

}


public abstract class State {
	
	public abstract void deduceMoney();
	
	public abstract boolean raffle();
	
	public abstract void dispensePrize();

}


public class TestActivity {
	
	@Test
	public void testActivity() {
		RaffleActivity activity = new RaffleActivity(1);
		
		for(int i = 0 ; i &lt; 30;i++) {
			System.out.println("第"+i+"次");
			activity.deduceMoney();
			activity.raffle();
		}
	}

}

public class CanRaffleState extends State {
	
	RaffleActivity activity;
	
	

	public CanRaffleState(RaffleActivity activity) {
		super();
		this.activity = activity;
	}

	@Override
	public void deduceMoney() {
		// TODO Auto-generated method stub
		System.out.println("已经扣取过积分");
		
	}

	@Override
	public boolean raffle() {
		System.out.println("正在抽奖，请稍等");
		Random r= new Random();
		int num = r.nextInt(10);
		// 10%中奖机会
		if(num &lt; 5) {
			// 把活动 的状态设置为 发放奖品
			System.out.println("000000\n\n");
			activity.setState(activity.getDispenseState());
			System.out.println("000000\n\n");
			return true;
		}
		System.out.println("很遗憾，没有中奖");
		// 改变状态为不能抽奖
		activity.setState(activity.getNoRaffleState());
		return false;
	}

	@Override
	public void dispensePrize() {
		// TODO Auto-generated method stub
		System.out.println("没中奖，不能发放奖品");
	}

}

public class DispenseOutState extends State {
	RaffleActivity activity;
	
	

	public DispenseOutState(RaffleActivity activity) {
		super();
		this.activity = activity;
	}
	@Override
	public void deduceMoney() {
		// TODO Auto-generated method stub
		System.out.println("奖品发完了，请下次再次参加");
	}

	@Override
	public boolean raffle() {
		// TODO Auto-generated method stub
		System.out.println("奖品发完了，请下次再次参加");
		return false;
	}

	@Override
	public void dispensePrize() {

		System.out.println("奖品发完了，请下次再次参加");
		// TODO Auto-generated method stub
		
	}

}

public class DispenseState extends State {

	RaffleActivity activity;

	public DispenseState(RaffleActivity activity) {
		super();
		this.activity = activity;
	}

	@Override
	public void deduceMoney() {
		System.out.println("不能扣除积分");
	}

	@Override
	public boolean raffle() {
		// TODO Auto-generated method stub
		System.out.println("当前状态不能抽奖");
		return false;
	}

	@Override
	public void dispensePrize() {
		// TODO Auto-generated method stub
		if (activity.getCount() &gt; 0) {
			System.out.println("恭喜中奖了");
			// 已经抽到了，就需要设置为不能再抽
			activity.setState(activity.getNoRaffleState());
		} else {
			System.out.println("奖品发完了,就没有必要再抽了");
			activity.setState(activity.getDispenseState());
			System.exit(0);
		}

	}

}


/**
 * 不能抽奖的状态
 * @author Administrator
 *
 */
public class NoRaffleState extends State{
	
	RaffleActivity activity;
	
	

	public NoRaffleState(RaffleActivity activity) {
		super();
		this.activity = activity;
	}

	@Override
	public void deduceMoney() {
		// TODO Auto-generated method stub
		System.out.println("扣除50积分，可以进行抽奖了");
		// 扣除积分后，再设置状态
		activity.setState(activity.getCanRaffleState());
//		activity
	}

	@Override
	public boolean raffle() {
		System.out.println("扣积分后才能抽奖");
		return false;
	}

	@Override
	public void dispensePrize() {
		System.out.println("the current state cant got prize");
	}

}</code></pre>
</div>
<h4 id="总结-15" class="source-line" data-source-line="3455">总结</h4>
<p class="source-line" data-source-line="3457">每个状态有不同的实现，如果没有之前的状态，是无法进行下一个状态。是一强状态流程控制的模式。</p>
<ol>
<li class="source-line" data-source-line="3460">代码有很强的可读性，状态模式将每个状态行为封闭到对应的一个类中</li>
<li class="source-line" data-source-line="3461">方便维护，将容易产生的问题if -else 语句删除了，如果把每个状态的行为都放到一个类中，每次调用方法都需要判断当前是什么状态，不但会产生很多if-else，而且容易出错</li>
<li class="source-line" data-source-line="3462">符合 &ldquo;开闭原则&rdquo;，容易增删状态</li>
<li class="source-line" data-source-line="3463">会产生很多类，每个状态都要一个对应的类，当状态过多时会产生很多类，加大维护难度</li>
<li class="source-line" data-source-line="3464">应用场景：当一个事件或者对象有很多种状态，状态之羊相互转换，对不同的状态要求有不同的行为时候，可以考虑使用状态模式</li>
</ol>
<p class="source-line" data-source-line="3466">（我写SCRUM看板的时候可以用到，每个任务都有不同的状态。）</p>
<h3 id="策略模式" class="source-line" data-source-line="3469">策略模式</h3>
<h4 id="我的思考" class="source-line" data-source-line="3472">我的思考</h4>
<p class="source-line" data-source-line="3473">用来干什么呢？</p>
<p class="source-line" data-source-line="3475">做类层面的解耦，把类的方法，聚合成一个类。像一个事物，很多种品类，不同品类需要不同的实现，但其中不同品类又有相同的实现，所以用上了策略模式，把实现方法的方法，变成策略层面的类。</p>
<p class="source-line" data-source-line="3477">汽车公司有几类产品，汽车，电动车，个人飞机。</p>
<p class="source-line" data-source-line="3479">汽车用充能的方法是加油，电动车是充电，个人飞机也是加油。所以这里的加油可以复用，成为一个策略类。<br />汽车有导航，电动车有导航，个人飞机也有导航。所以这里的导航，可以复用的，都是一个方法。</p>
<p class="source-line" data-source-line="3482">把实现抽象成类，然后进行复用。</p>
<h4 id="简单实现" class="source-line" data-source-line="3484">简单实现</h4>
<p class="source-line" data-source-line="3486">上面是我的简单总结，目前的水平只能看到这些，后面持续精进</p>
<img src="https://img2023.cnblogs.com/blog/2146100/202303/2146100-20230325124208538-328637871.png" alt="" class="vx-image-view-image" />
<div class="code-toolbar">
<pre class="language-java line-numbers highlighter-hljs"><code>
package cn.kbug.strategy;

public class TestVechile {

	
	@Test
	public void testVechileStrategy() {
		EletricCar eletricCar = new EletricCar("BYD");
		eletricCar.charge();
		eletricCar.navigate();
		System.out.println(" ~~~~ ");
		PetrolCar petrolCar = new PetrolCar("汽油车");
		petrolCar.charge();
		petrolCar.navigate();
	}
}

package cn.kbug.strategy;

public abstract class Vehicle {

	private ChargeStrategy chargeStrategy;
	private NavigationStrategy navigationStrategy;
	private String name;

	public Vehicle(String name) {
		this.name = name;
	}
	public abstract void charge();
	public abstract void navigate();

	public ChargeStrategy getChargeStrategy() {
		return chargeStrategy;
	}

	public void setChargeStrategy(ChargeStrategy chargeStrategy) {
		this.chargeStrategy = chargeStrategy;
	}

	public NavigationStrategy getNavigationStrategy() {
		return navigationStrategy;
	}

	public void setNavigationStrategy(NavigationStrategy navigationStrategy) {
		this.navigationStrategy = navigationStrategy;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}

package cn.kbug.strategy.strategies;

public interface ChargeStrategy {

	public void charge();
}

package cn.kbug.strategy.strategies;

public interface NavigationStrategy {
	
	public void navigate();
}

package cn.kbug.strategy.strategies.charge;


public class ChargingModeStrategy implements ChargeStrategy{

	@Override
	public void charge() {
		System.out.println("充电");
	}

}

package cn.kbug.strategy.strategies.charge;


public class RefuelModeStrategy implements ChargeStrategy{

	@Override
	public void charge() {
		System.out.println("加汽油");
	}

}

package cn.kbug.strategy.strategies.navigate;


public class MobileNavigationStrategy implements NavigationStrategy{

	@Override
	public void navigate() {
		System.out.println(" 移动 智能导航 ");
	}

}

package cn.kbug.strategy.vehicles;


public class EletricCar extends Vehicle {

	public EletricCar(String name) {
		super(name);
		this.setNavigationStrategy(new MobileNavigationStrategy());
		this.setChargeStrategy(new ChargingModeStrategy());
	}

	@Override
	public void charge() {
		// TODO Auto-generated method stub
		this.getChargeStrategy().charge();
	}

	@Override
	public void navigate() {
		// TODO Auto-generated method stub
		this.getNavigationStrategy().navigate();
	}

}

package cn.kbug.strategy.vehicles;


public class PetrolCar extends Vehicle {

	public PetrolCar(String name) {
		super(name);
		this.setNavigationStrategy(new MobileNavigationStrategy());
		this.setChargeStrategy(new RefuelModeStrategy());
	}

	@Override
	public void charge() {
		this.getChargeStrategy().charge();
	}

	@Override
	public void navigate() {
		this.getNavigationStrategy().navigate();
	}
	

}</code></pre>
</div>
<h4 id="总结-16" class="source-line" data-source-line="3650">总结</h4>
<ol>
<li class="source-line" data-source-line="3652">策略模式的关键是： 分析项目中变化部分与不变部分</li>
<li class="source-line" data-source-line="3653">策略模式的核心思想是：多用组合 /聚合 少用继承， 用行为类组合，而不是行为继承，更有弹性</li>
<li class="source-line" data-source-line="3654">体现了 &ldquo; 对修改关闭，对扩展开放&rdquo;原则，客户端增加行为不用修改原有代码，只要添加一种策略即可，避免了使用多重转移语句（if..else if..else)</li>
<li class="source-line" data-source-line="3655">提供了可以替换继承关系的办法，策略模式将算法封闭在独立的Strategy类中使得你可以独立于其中Context改变它，使它易于切换、易于理解、易于扩展。</li>
<li class="source-line" data-source-line="3656">需求注意的是：每添加一个策略就要增加一个类，当策略过多是会导致类数目庞大。</li>
</ol>
<p class="source-line" data-source-line="3658">是的，每一个功能都会成为单独的一个策略类。</p>
<h3 id="职责链模式" class="source-line" data-source-line="3661">职责链模式</h3>
<p class="source-line" data-source-line="3663">我的理解就是，将处理者全部链接起来，每个环节每个可能的条件都会有一个处理者。当前无法处理的，就调用下一个处理者进行执行。</p>
<p class="source-line" data-source-line="3665">简单的关于链的处理方式的思考🤔：</p>
<ol>
<li class="source-line" data-source-line="3667">如果条件不符合所有的处理者，则直接抛异常，</li>
<li class="source-line" data-source-line="3668">从头执行到尾，如果没有调用也需要抛异常</li>
<li class="source-line" data-source-line="3669">是以一个环形进行处理的，所以一个对象如果经常一个环了还没有解决，可能是需要抛异常了</li>
</ol>
<p class="source-line" data-source-line="3671">当然在性能上可能会有一些问题，这不是目前讨论的。</p>
<h4 id="代码实现-1" class="source-line" data-source-line="3673">代码实现</h4>
<img src="https://img2023.cnblogs.com/blog/2146100/202303/2146100-20230325124208732-1078116344.png" alt="" class="vx-image-view-image" />
<div class="code-toolbar">
<pre class="language-java line-numbers highlighter-hljs"><code>
public abstract class Approver {

	Approver approver;
	String name;

	public Approver(String name) {
		super();
		this.name = name;
	}
	
	public void setApprover(Approver approver) {
		this.approver = approver;
	}
	
	public abstract void processRequest(Request request);

	public String getName() {
		return name;
	}

	public Approver getApprover() {
		return approver;
	}

	
	
}

public class Request {

	private String message;
	private int price;
	
	
	public Request(String message, int price) {
		super();
		this.message = message;
		this.price = price;
	}

	public String getMessage() {
		return message;
	}
	
	public int getPrice() {
		return price;
	}
	
	
	
}

public class TestChain {

	@Test
	public void testChain() {
		CollegeApprover collegeApprover = new CollegeApprover("计算机");
		DepartmentApprover departmentApprover = new DepartmentApprover("软件工程");
		SchoolMasterApprover schoolerMasterApprover = new SchoolMasterApprover("张校长");
		
		collegeApprover.setApprover(departmentApprover);

		departmentApprover.setApprover(schoolerMasterApprover);
		// 闭环
		schoolerMasterApprover.setApprover(collegeApprover);
		
		schoolerMasterApprover.processRequest(new Request("买个键盘",1000));

		
	}

}


public class CollegeApprover extends Approver {

	public CollegeApprover(String name) {
		super(name);
		// TODO Auto-generated constructor stub
	}

	@Override
	public void processRequest(Request request) {
		if(request.getPrice() &gt; 100 &amp;&amp; request.getPrice() &lt;= 1000) {
			System.out.printf("{name: \"%s\",message: \"%s\",price: %d}\n",getName(),request.getMessage(),request.getPrice());
			System.out.println(getName() + " 学院，我直接处理 ThreadID:"+Thread.currentThread().getId());
		}else {
			// 处理不了，打到下个
			getApprover().processRequest(request)	;
		}
	}

}

public class DepartmentApprover extends Approver {

	public DepartmentApprover(String name) {
		super(name);
		// TODO Auto-generated constructor stub
	}

	

	@Override
	public void processRequest(Request request) {
		if(request.getPrice() &lt; 100) {
			System.out.printf("{name: \"%s\",message: \"%s\",price: %d}\n",getName(),request.getMessage(),request.getPrice());
			System.out.println(getName() + "系 ，我直接处理 ThreadID:"+Thread.currentThread().getId());
		}else {
			// 处理不了，打到下个
			getApprover().processRequest(request);
		}
	}
}

package cn.kbug.resonsibilitychain.impl;

import cn.kbug.resonsibilitychain.Approver;
import cn.kbug.resonsibilitychain.Request;

public class SchoolMasterApprover  extends Approver {

	public SchoolMasterApprover(String name) {
		super(name);
		// TODO Auto-generated constructor stub
	}


	@Override
	public void processRequest(Request request) {
		if(request.getPrice() &gt; 1000) {
			System.out.printf("{name: \"%s\",message: \"%s\",price: %d}\n",getName(),request.getMessage(),request.getPrice());
			System.out.println(getName() + "校长 ，我直接处理 ThreadID:"+Thread.currentThread().getId());
		}else {
			// 处理不了，打到下个
			getApprover().processRequest(request)	;
		}	
	}

}</code></pre>
</div>
<h4 id="总结-17" class="source-line" data-source-line="3821">总结</h4>
<ol>
<li class="source-line" data-source-line="3824">将请求和处理分开，实现解耦，提高系统的灵活性</li>
<li class="source-line" data-source-line="3825">简化了对象，使对象不需要知道链的结构</li>
<li class="source-line" data-source-line="3826">性能会受到影响，特别是 在边比较长的时候，因此需要控制链中最大节点数量，一般通过在Handler中设置一个最大节点数量，在setNext()方法 中判断是否已经超过阀值，超过则不允许该链建立，避免出现超长链无意识地破坏系统性能</li>
</ol>
<p class="source-line" data-source-line="3829">缺点:</p>
<ul>
<li class="source-line" data-source-line="3831">高度不方便，采用了类似递归的方式，高度时逻辑可能比较复杂</li>
<li class="source-line" data-source-line="3832">最佳应用场景；有多个对象可以处理同一个请求时，比如： 多级请求、请假/加薪 等审批流程，JavaWEB中Tomcat对Encoding的处理，拦截器</li>
</ul>
</div>
</div>
</div>
</div>
<!-- VX_OUTLINE_BUTTON_START -->
<div id="container-floating" class="d-none d-md-block d-xl-block" style="display: none;">
<div id="floating-button">
<p id="floating-more" class="more">&gt;</p>
</div>
</div>
<!-- VX_OUTLINE_BUTTON_END -->