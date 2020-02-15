function words2numbers(){

/*
================================================================================
* Библиотека расширения стандартного JavaScript                                *

* Название:	Js_Veremax                                                     *
* Модуль:	String                                                         *
* Версия: 	1.1                                                            *
* Сайт:		http://garazh.biz                                              *
*                                                                              *
* Автор: 	Верещако Максим Валерьевич (Veremax)                           *
* Компания:	ООО "ГенПолис", http://genpolis.ru                             *
================================================================================
*/

String.prototype.trimRight=function()
// убирает все пробелы в конце строки
{
  var r=/\s+$/g;
  return this.replace(r,'');
}

/* *************************************************************************** */

String.prototype.trimLeft=function()
// убирает все пробелы в начале строки
{
  var r=/^\s+/g;
  return this.replace(r,'');
}

/* *************************************************************************** */

String.prototype.trim=function()
// убирает все пробелы в начале и в конце строки
{
  return this.trimRight().trimLeft();
}

/* *************************************************************************** */

String.prototype.trimMiddle=function()
// убирает все пробелы в начале и в конце строки
// помимо этого заменяет несколько подряд
// идущих пробелов внутри строки на один пробел
{
  var r=/\s\s+/g;
  return this.trim().replace(r,' ');
}

/* *************************************************************************** */

String.prototype.trimAll=function()
// убирает все пробелы в строке s
{
  var r=/\s+/g;
  return this.replace(r,'');
}

/* *************************************************************************** */

String.prototype.repeat=function(n)
// повторяет строку n раз
{
  var r='';
  if (typeof(n)=='number')
    for (var i=1; i<=n; i++) r+=this;
  return r;
}

/* *************************************************************************** */

String.prototype.padRight=function(n,c)
// дополняет строку справа строкой c
// или обрезает исходную строку справа до длины n
{
  var r='';
  var s=' ';

  if (typeof(c)=='string')
    if (c.length>0)
      s=c;

  if (typeof(n)=='number')
  {
    if (n>0)
    {
      var l=this.length;
      if (l>n)
        r=this.substr(0,n);
      else
        if (l==n)
          r=this;
        else
        {
          r=this;
          while (r.length<n) r+=s;
          r=r.substr(0,n);
        }
    }
  }
  return r;
}

/* *************************************************************************** */

String.prototype.padLeft=function(n,c)
// дополняет строку слева строкой c
// или обрезает исходную строку слева до длины n
{
  var r='';
  var s=' ';

  if (typeof(c)=='string')
    if (c.length>0)
      s=c;

  if (typeof(n)=='number')
  {
    if (n>0)
    {
      var l=this.length;
      if (l>n)
        r=this.substr(l-n);
      else
        if (l==n)
          r=this;
        else
        {
          r=this;
          while (r.length<n) r=s+r;
          r=r.substr(r.length-n);
        }
    }
  }
  return r;
}

/* *************************************************************************** */

String.prototype.isDigits=function()
// проверяет, является ли строка
// последовательностью цифр
{
  var r=/^\d+$/;
  return r.test(this);
}

/* *************************************************************************** */

String.prototype.isInt=function()
// проверяет, является ли строка целым числом
{
  var r=/^[+\-]?\d+$/;
  return r.test(this);
}

/* *************************************************************************** */

String.prototype.isIntStr=function()
// проверяет, является ли строка
// форматированным целым числом
// с (необязательным) разделением триад цифр пробелом
{
  var r1=/^(?:[+\-](?:[ ]?))?(?:\d{1,3})(?:[ ]\d{3})+$/;
  var r2=/^(?:[+\-](?:[ ])?)?\d+$/;

  return r1.test(this.trim()) || r2.test(this.trim());
}

/* *************************************************************************** */

String.prototype.isFloat=function()
// проверяет, является ли строка дробным числом
// с разделителем "точка"
{
  var r=/^[+\-]?\d+(?:\.\d+)?$/;
  return r.test(this);
}

/* *************************************************************************** */

String.prototype.isFloatStr=function()
// проверяет, является ли строка форматированным
// дробным числом с разделителем "запятая" или "точка"
// и (необязательно) с разделением триад цифр пробелом
{
  var r1=/^(?:[+\-](?:[ ]?))?(?:\d{1,3})(?:\s\d{3})+(?:[\.,]\d+)?$/;
  var r2=/^(?:[+\-](?:[ ])?)?\d+(?:[\.,]\d+)?$/;

  return r1.test(this.trim()) || r2.test(this.trim());
}

/* *************************************************************************** */

String.prototype.isDate=function()
// проверяет, является ли строка
// датой в формате YYYY-MM-DD
{
  var r=/^(\d{4})-(\d{2})-(\d{2})$/;
  if (r.test(this))
  {
    var y=RegExp.$1*1;
    var m=RegExp.$2*1;
    var d=RegExp.$3*1;
    var test=new Date(y,m-1,d);
    return
    (
      test.getFullYear()==y &&
      test.getMonth()==m-1 &&
      test.getDate()==d
    );
  }
  else
    return false;
}

/* *************************************************************************** */

String.prototype.isDateStr=function()
// проверяет, является ли строка
// датой в формате DD.MM.YYYY
{
  var r=/^(\d{2})-(\d{2})-(\d{4})$/;
  if (r.test(this))
  {
    var y=RegExp.$3*1;
    var m=RegExp.$2*1;
    var d=RegExp.$1*1;
    var test=new Date(y,m-1,d);
    return
    (
      test.getFullYear()==y &&
      test.getMonth()==m-1 &&
      test.getDate()==d
    );
  }
  else
    return false;
}

/* *************************************************************************** */

String.prototype.toInt=function()
// конвертирует строку в целое число
// в случае ошибки возвращает false
{
  if (this.isIntStr())
    return (this.trimAll())*1;
  else
    return false;
}

/* *************************************************************************** */

String.prototype.toFloat=function()
// конвертирует строку в дробное число
// в случае ошибки возвращает false
{
  if (this.isFloatStr())
    return (this.trimAll().replace(',','.'))*1;
  else
    return false;
}

/* *************************************************************************** */

String.prototype.toDateStr=function()
// конвертирует дату из формата YYYY-MM-DD
// в формат DD.MM.YYYY
// в случае ошибки возвращает false
{
  if (this.isDate())
    return this.substr(8,2)+'.'+
    this.substr(5,2)+'.'+this.substr(0,4);
  else
    return false;
}

/* *************************************************************************** */

String.prototype.toDate=function()
// конвертирует дату из формата DD.MM.YYYY
// в формат YYYY-MM-DD
// в случае ошибки возвращает false
{
  if (this.isDateStr())
    return this.substr(6,4)+'-'+
    this.substr(3,2)+'-'+this.substr(0,2);
  else
    return false;
}

/* *************************************************************************** */

String.prototype.toDateObject=function()
// конвертирует дату из формата YYYY-MM-DD
// в объект Date
// в случае ошибки возвращает false
{
  if (this.isDate())
    return new Date
      (
        this.substr(0,4)*1,
        this.substr(5,2)*1-1,
        this.substr(8,2)*1
      );
  else
    return false;
}

/* *************************************************************************** */


Math.roundTo=function(i,n)
// округляет число i до заданного количества n
// знаков после (или перед) запятой
{
  if (typeof(i)=='number')
    return i.roundTo(n);
  else
    return false;
}

Number.prototype.isInt=function()
// возвращает True, если число является целым
{
  return (Math.round(this)==this);
}

/* *************************************************************************** */

Number.prototype.roundTo=function(n)
// округляет число до заданного количества n
// знаков после (или перед) запятой
{
  var x=0;
  if (typeof(n)=='number')
    if (n.isInt())
      if (n>=-6 && n<=6) x=n;
  x=Math.pow(10,x);
  return Math.round(this*x)/x;
}

/* *************************************************************************** */

Number.prototype.toFloatStr=function(n,triads)
// конвертирует дробное число в форматированную строку
// с количеством знаков после запятой n и с разделением
// триад цифр пробелами (при triads!=0)
// в случае ошибки возвращает false
{
  var s,d=0,k,m;

  if (typeof(n)=='number')
    if (n.isInt())
      if (n>=-6 && n<=6) d=n;

  s=this.roundTo(d).toString().replace('.',',');

  if (d>0)
  {
    k=s.indexOf(',');
    if (k==-1)
      s+=','+'0'.repeat(d);
    else
      s+='0'.repeat(d-(s.length-k-1));
  }

  k=s.indexOf(',');
  if (k==-1) k=s.length;
  m=s.indexOf('-');
  if (m==-1)
    m=0;
  else
    m=1;

  if (triads)
    for (d=k-3;d>m;d=d-3)
    {
      s=s.substr(0,d)+' '+s.substr(d,s.length-d+1);
    }
    
  return s;
}

/* *************************************************************************** */

Number.prototype.toPhrase=function(c)
// сумма прописью для чисел от 0 до 999 триллионов
// можно передать параметр "валюта": RUB,USD,EUR (по умолчанию RUB)
{
  var x=this.roundTo(2);
  if (x<0 || x>999999999999999.99) return false;

  var currency='RUB';
  if (typeof(c)=='string')
    currency=c.trimAll().toUpperCase();

  if (currency=='RUR') currency='RUB';
  if (currency!='RUB' && currency!='USD' && currency!='EUR') return false;

  var groups=new Array();

  groups[0]=new Array();
  groups[1]=new Array();
  groups[2]=new Array();
  groups[3]=new Array();
  groups[4]=new Array();

  groups[9]=new Array();

// рубли
// по умолчанию
  groups[0][-1]={'RUB': 'рублей', 'USD': 'долларов США', 'EUR': 'евро'};
//исключения
  groups[0][1]={'RUB': 'рубль', 'USD': 'доллар США',  'EUR': 'евро'};
  groups[0][2]={'RUB': 'рубля', 'USD': 'доллара США', 'EUR': 'евро'};
  groups[0][3]={'RUB': 'рубля', 'USD': 'доллара США', 'EUR': 'евро'};
  groups[0][4]={'RUB': 'рубля', 'USD': 'доллара США', 'EUR': 'евро'};

// тысячи
// по умолчанию
  groups[1][-1]='тысяч';
//исключения
  groups[1][1]='тысяча';
  groups[1][2]='тысячи';
  groups[1][3]='тысячи';
  groups[1][4]='тысячи';

// миллионы
// по умолчанию
  groups[2][-1]='миллионов';
//исключения
  groups[2][1]='миллион';
  groups[2][2]='миллиона';
  groups[2][3]='миллиона';
  groups[2][4]='миллиона';

// миллиарды
// по умолчанию
  groups[3][-1]='миллиардов';
//исключения
  groups[3][1]='миллиард';
  groups[3][2]='миллиарда';
  groups[3][3]='миллиарда';
  groups[3][4]='миллиарда';

// триллионы
// по умолчанию
  groups[4][-1]='триллионов';
//исключения
  groups[4][1]='триллион';
  groups[4][2]='триллиона';
  groups[4][3]='триллиона';
  groups[4][4]='триллиона';

// копейки
// по умолчанию
  groups[9][-1]={'RUB': 'копеек', 'USD': 'центов', 'EUR': 'центов'};
//исключения
  groups[9][1]={'RUB': 'копейка', 'USD': 'цент', 'EUR': 'цент'};
  groups[9][2]={'RUB': 'копейки', 'USD': 'цента', 'EUR': 'цента'};
  groups[9][3]={'RUB': 'копейки', 'USD': 'цента', 'EUR': 'цента'};
  groups[9][4]={'RUB': 'копейки', 'USD': 'цента', 'EUR': 'цента'};


// цифры и числа
// либо просто строка, либо 4 строки в хэше
  var names=new Array();
  names[1]={0: 'один', 1: 'одна', 2: 'один', 3: 'один', 4: 'один'};
  names[2]={0: 'два', 1: 'две', 2: 'два', 3: 'два', 4: 'два'};
  names[3]='три';
  names[4]='четыре';
  names[5]='пять';
  names[6]='шесть';
  names[7]='семь';
  names[8]='восемь';
  names[9]='девять';
  names[10]='десять';
  names[11]='одиннадцать';
  names[12]='двенадцать';
  names[13]='тринадцать';
  names[14]='четырнадцать';
  names[15]='пятнадцать';
  names[16]='шестнадцать';
  names[17]='семнадцать';
  names[18]='восемнадцать';
  names[19]='девятнадцать';
  names[20]='двадцать';
  names[30]='тридцать';
  names[40]='сорок';
  names[50]='пятьдесят';
  names[60]='шестьдесят';
  names[70]='семьдесят';
  names[80]='восемьдесят';
  names[90]='девяносто';
  names[100]='сто';
  names[200]='двести';
  names[300]='триста';
  names[400]='четыреста';
  names[500]='пятьсот';
  names[600]='шестьсот';
  names[700]='семьсот';
  names[800]='восемьсот';
  names[900]='девятьсот';


  var r='';
  var i,j;

  var y=Math.floor(x);

// если НЕ ноль рублей
  if (y>0)
  {
  // выделим тройки с рублями, тысячами, миллионами, миллиардами и триллионами
    var t=new Array();

    for (i=0;i<=4;i++)
    {
      t[i]=y%1000;
      y=Math.floor(y/1000);  
    }

    var d=new Array();

  // выделим в каждой тройке сотни, десятки и единицы
    for (i=0;i<=4;i++)
    {
      d[i]=new Array();
      d[i][0]=t[i]%10; // единицы
      d[i][10]=t[i]%100-d[i][0]; // десятки
      d[i][100]=t[i]-d[i][10]-d[i][0]; // сотни
      d[i][11]=t[i]%100; // две правых цифры в виде числа
    }

    for (i=4; i>=0; i--)
    {
      if (t[i]>0)
      {
        if (names[d[i][100]])
          r+=' '+ ((typeof(names[d[i][100]])=='object')?(names[d[i][100]][i]):(names[d[i][100]]));

        if (names[d[i][11]])
          r+=' '+ ((typeof(names[d[i][11]])=='object')?(names[d[i][11]][i]):(names[d[i][11]]));
        else
        {
          if (names[d[i][10]]) r+=' '+ ((typeof(names[d[i][10]])=='object')?(names[d[i][10]][i]):(names[d[i][10]]));
          if (names[d[i][0]]) r+=' '+ ((typeof(names[d[i][0]])=='object')?(names[d[i][0]][i]):(names[d[i][0]]));
        }
         
        if (names[d[i][11]])  // если существует числительное
          j=d[i][11];
        else
          j=d[i][0];

        if (groups[i][j])
        {
          if (i==0)
            r+=' '+groups[i][j][currency];
          else
            r+=' '+groups[i][j];
        }
        else
        {
          if (i==0)
            r+=' '+groups[i][-1][currency];
          else
            r+=' '+groups[i][-1];
        }
      }
    }

    if (t[0]==0)
      r+=' '+groups[0][-1][currency];
  }
  else
    r='Ноль '+groups[0][-1][currency];



  y=((x-Math.floor(x))*100).roundTo();
  if (y<10) y='0'+y;

  r=r.trimMiddle();
  r=r.substr(0,1).toUpperCase()+r.substr(1);
  r+=' '+y;

  y=y*1;

  if (names[y])  // если существует числительное
    j=y;
  else
    j=y%10;

  if (groups[9][j])
    r+=' '+groups[9][j][currency];
  else
    r+=' '+groups[9][-1][currency];

  return r;
}


}
