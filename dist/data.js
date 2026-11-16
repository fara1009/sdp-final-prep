export const DATA = {
  "lectures": [
    {
      "id": "lecture-1",
      "number": 1,
      "title": "Builder и чистые функции",
      "summary": "Как собирать сложные объекты по шагам и писать понятные функции.",
      "minutes": 7,
      "topics": [
        "Builder",
        "Design patterns",
        "Clean code"
      ],
      "source": "Lecture 1 (1).pdf",
      "pages": "1–16",
      "sections": [
        {
          "title": "Зачем нужны design patterns",
          "body": "Паттерн — повторяемая идея решения задачи проектирования, которую адаптируют к своему коду. Это не готовая библиотека и не конкретный алгоритм.",
          "bullets": [
            "Creational: как создавать объекты (например, Builder).",
            "Structural: как соединять классы и объекты (Decorator, Facade, Adapter).",
            "Behavioral: как распределять поведение и общение объектов (Strategy, Observer).",
            "В описании паттерна ищи intent (цель), motivation (проблему), structure (участников и связи) и пример."
          ]
        },
        {
          "title": "Builder: создание по шагам",
          "body": "Builder отделяет процесс настройки сложного объекта от самого результата. Удобен при множестве параметров и вариантов: вместо длинного конструктора читаем последовательность понятных вызовов.",
          "bullets": [
            "Product — готовый объект.",
            "Builder задаёт шаги; ConcreteBuilder реализует их.",
            "Client выбирает builder и задаёт параметры.",
            "Director — необязательный помощник: повторяет заранее заданную последовательность шагов.",
            "Разные builders могут выполнять одинаковые шаги, создавая разные результаты, например автомобиль и руководство к нему."
          ]
        },
        {
          "title": "Как читать Java-код Builder",
          "body": "Методы настройки часто возвращают this, поэтому их можно объединять в цепочку. build() создаёт и возвращает Product. Director для такой цепочки не обязателен.",
          "bullets": [
            "Ищи поля builder, их начальные значения и присваивания в setter-методах.",
            "Повторная настройка одного поля обычно заменяет старое значение — проверь реализацию.",
            "build() — подходящее место для проверки итоговой конфигурации.",
            "Builder сам по себе не гарантирует неизменяемость: она зависит от реализации Product и копирования изменяемых данных."
          ],
          "code": "class Report {\n  final String title;\n  final boolean detailed;\n  private Report(Builder b) {\n    title = b.title;\n    detailed = b.detailed;\n  }\n  static class Builder {\n    String title = \"Untitled\";\n    boolean detailed = false;\n    Builder title(String value) { title = value; return this; }\n    Builder detailed(boolean value) { detailed = value; return this; }\n    Report build() { return new Report(this); }\n  }\n}\n// Получится title = \"Final\", detailed = false\nReport report = new Report.Builder().title(\"Final\").build();"
        },
        {
          "title": "Когда выбирать Builder",
          "body": "Выбирай Builder, когда создание действительно сложно: много необязательных параметров, последовательные шаги или разные представления одного продукта.",
          "bullets": [
            "Плюс: читаемая настройка и повторное использование сборки.",
            "Плюс: логика сборки отделена от бизнес-логики готового объекта.",
            "Минус: дополнительные классы и код.",
            "Для простого объекта с двумя понятными параметрами обычного конструктора может быть достаточно."
          ]
        },
        {
          "title": "Clean Code: одна функция — одна задача",
          "body": "Функция должна быть небольшой и работать на одном уровне абстракции. Совет лекции о коротких функциях — ориентир для читаемости, а не правило компилятора.",
          "bullets": [
            "Не смешивай orchestration вроде createReport() с низкоуровневыми append(\"\\n\") в одном длинном методе.",
            "Step-down rule: сначала высокий уровень, затем функции с деталями.",
            "Уменьшай глубокую вложенность; выноси осмысленные подзадачи.",
            "Давай названия, объясняющие действие, и используй одинаковые термины для одинаковых понятий."
          ]
        },
        {
          "title": "Аргументы, побочные эффекты и DRY",
          "body": "Небольшое число понятных аргументов и явное поведение облегчают чтение кода. Связанные значения можно объединять в value object.",
          "bullets": [
            "Flag argument может скрывать два разных действия: вместо save(true/false) подумай о двух понятных методах.",
            "Command изменяет состояние; query возвращает информацию. Избегай неожиданных изменений внутри метода чтения.",
            "Не скрывай побочные эффекты: метод с именем checkPassword() не должен неожиданно очищать данные.",
            "DRY: вынеси реально повторяющуюся логику в одно место.",
            "Обработку ошибок отделяй от основного алгоритма; предпочитай понятные исключения непроверяемым кодам ошибки."
          ]
        }
      ]
    },
    {
      "id": "lecture-5",
      "number": 5,
      "title": "Decorator и обработка ошибок",
      "summary": "Как добавлять функции через обёртки, отличать Decorator от Adapter и обрабатывать ошибки без путаницы.",
      "minutes": 9,
      "topics": [
        "Decorator",
        "Adapter",
        "Clean code"
      ],
      "source": "Lecture 5 (1).pdf",
      "pages": "1–47",
      "sections": [
        {
          "title": "Decorator: слои поведения",
          "body": "Decorator — structural pattern. Он оборачивает существующий объект, сохраняя общий интерфейс, и добавляет действия до или после делегирования. Слои можно комбинировать во время работы программы.",
          "bullets": [
            "Component — общий интерфейс.",
            "Concrete Component — базовый объект.",
            "Base Decorator хранит ссылку на Component и делегирует вызовы.",
            "Concrete Decorator добавляет своё поведение.",
            "Client собирает цепочку и работает через Component.",
            "Наследование или implements обеспечивает общий тип; композиция даёт дополнительное поведение."
          ]
        },
        {
          "title": "Считай цепочку изнутри наружу",
          "body": "Вызов приходит к внешней обёртке. Она вызывает вложенный объект, пока выполнение не дойдёт до основы. Результат возвращается обратно через все слои.",
          "bullets": [
            "Каждый слой должен учитывать результат вложенного объекта, иначе прежнее поведение потеряется.",
            "Одинаковый декоратор можно применить несколько раз.",
            "Для добавления фиксированных цен порядок не меняет сумму.",
            "Если один слой умножает, а другой прибавляет, порядок может изменить результат."
          ],
          "code": "interface Price { int cost(); }\nclass Base implements Price {\n  public int cost() { return 1000; }\n}\nclass Milk implements Price {\n  private final Price inner;\n  Milk(Price inner) { this.inner = inner; }\n  public int cost() { return inner.cost() + 200; }\n}\nPrice p = new Milk(new Milk(new Base()));\nSystem.out.println(p.cost()); // 1400"
        },
        {
          "title": "Почему не отдельный подкласс для каждой комбинации",
          "body": "Если для каждого сочетания добавок создавать класс, количество классов быстро растёт. Decorator позволяет собрать нужный вариант из независимых слоёв.",
          "bullets": [
            "Open–Closed Principle: новые функции добавляются расширением, без изменения проверенной основы.",
            "Примеры: напитки с добавками, форматирование текста, Java I/O, дополнительные каналы уведомлений.",
            "BufferedInputStream оборачивает InputStream и добавляет буферизацию.",
            "Builder или Factory могут упростить создание длинной цепочки декораторов."
          ]
        },
        {
          "title": "Decorator, Adapter и другие паттерны",
          "body": "Смотри на цель обёртки, а не только на наличие поля inner.",
          "bullets": [
            "Decorator сохраняет интерфейс и добавляет функции.",
            "Adapter переводит ожидаемый Target API в несовместимый Adaptee API.",
            "Facade даёт более простой вход к сложной подсистеме.",
            "Builder организует создание; Factory Method выбирает создание через подклассы; Abstract Factory создаёт семейства связанных продуктов.",
            "Bridge разделяет абстракцию и реализацию на две независимо изменяемые стороны.",
            "Можно сначала адаптировать API, затем обернуть его декораторами для логирования или повторных попыток."
          ]
        },
        {
          "title": "Ограничения Decorator",
          "body": "Гибкость требует контроля над порядком и количеством обёрток. Decorator не устраняет сложность автоматически.",
          "bullets": [
            "Много маленьких классов и глубокие цепочки усложняют отладку.",
            "Удалить конкретный внутренний слой сложнее, чем добавить внешний.",
            "Не рассчитывай, что обёрнутый объект имеет конкретный класс основы: работай через общий интерфейс.",
            "Для преобразований данных проверь порядок записи и обратный порядок восстановления при чтении."
          ]
        },
        {
          "title": "Clean Code: ошибки отдельно от основного потока",
          "body": "Исключения позволяют не проверять код ошибки после каждого вызова. Основной алгоритм остаётся читаемым, а обработчик отвечает за восстановление или сообщение о проблеме.",
          "bullets": [
            "Сначала продумай try/catch/finally и состояние системы после сбоя.",
            "try/catch сам по себе не откатывает уже выполненные изменения: согласованность нужно обеспечить кодом.",
            "Сообщение исключения должно объяснять операцию и причину; сохраняй исходную причину при оборачивании.",
            "В лекции рекомендуется предпочитать unchecked exceptions в обычном приложении, чтобы не распространять низкоуровневые checked exceptions по всем сигнатурам.",
            "Классифицируй исключения по реакции вызывающего кода: одинаковые способы восстановления можно объединить."
          ]
        },
        {
          "title": "Обёртки API, Special Case и null",
          "body": "Обёртка над сторонним API может переводить несколько его исключений в одно понятное исключение приложения. Так детали библиотеки не расползаются по всему коду.",
          "bullets": [
            "Special Case object представляет нормальный особый случай, например значение расходов по умолчанию.",
            "Если коллекция пуста, обычно верни пустой список, а не null.",
            "Не передавай null там, где контракт требует объект; проверяй входные значения на границе.",
            "Отсутствие данных и настоящая ошибка — разные ситуации: не заменяй все ошибки пустым результатом."
          ]
        }
      ]
    },
    {
      "id": "lecture-6",
      "number": 6,
      "title": "Facade и качественные тесты",
      "summary": "Как скрыть сложный сценарий за одним методом и проверять программу с помощью TDD и F.I.R.S.T.",
      "minutes": 8,
      "topics": [
        "Facade",
        "Clean code",
        "Testing"
      ],
      "source": "Lecture 6 (1).pdf",
      "pages": "1–42",
      "sections": [
        {
          "title": "Facade: простой вход к подсистеме",
          "body": "Facade — structural pattern, который предоставляет удобный интерфейс для сложной подсистемы. Клиент вызывает один понятный метод, а фасад координирует компоненты.",
          "bullets": [
            "Facade знает компоненты и нужный порядок вызовов.",
            "Subsystem classes выполняют настоящую работу и не обязаны знать о фасаде.",
            "Client пользуется упрощённым интерфейсом.",
            "Примеры: watchMovie(), convertVideo(), placeOrder().",
            "Фасад может организовывать последовательность и преобразовывать данные, а не только пересылать один вызов."
          ]
        },
        {
          "title": "Читай порядок действий",
          "body": "При вопросе об output выпиши вызовы в порядке их выполнения. Сам паттерн не определяет конкретный порядок — его задаёт тело метода.",
          "bullets": [
            "Композиция: фасад хранит ссылки на нужные компоненты.",
            "Зависимости можно получить через конструктор.",
            "Если компонент выбросит исключение, следующие строки обычного потока не выполнятся без соответствующей обработки."
          ],
          "code": "class TheaterFacade {\n  private final Lights lights;\n  private final Player player;\n  TheaterFacade(Lights lights, Player player) {\n    this.lights = lights;\n    this.player = player;\n  }\n  void watchMovie(String title) {\n    lights.dim();\n    player.on();\n    player.play(title);\n  }\n}\n// Один вызов клиента запускает три шага:\n// theater.watchMovie(\"Film\");"
        },
        {
          "title": "Что Facade не означает",
          "body": "Facade упрощает работу с подсистемой, но не обязан запрещать прямой доступ к ней. Для разных сценариев у одной подсистемы может быть несколько фасадов.",
          "bullets": [
            "Facade упрощает API; Adapter решает несовместимость API. Количество обёрнутых классов не является главным различием.",
            "Сложность скрывается от обычного клиента, но остаётся внутри компонентов.",
            "Если фасад собирает все обязанности приложения, он превращается в god object.",
            "Разделяй слишком большой фасад на несколько сфокусированных фасадов.",
            "Для простой системы лишний слой может оказаться ненужным."
          ]
        },
        {
          "title": "Principle of Least Knowledge",
          "body": "Объекту лучше общаться с небольшим числом близких объектов, чтобы изменение внутренней структуры не ломало множество клиентов.",
          "bullets": [
            "Обычно метод обращается к себе, своим компонентам, полученным параметрам и созданным им объектам.",
            "Цепочка вроде order.getCustomer().getWallet().charge() раскрывает клиенту внутренние связи.",
            "Лучше предложить понятную операцию нужного уровня, если она соответствует обязанностям объекта.",
            "Плюс: меньше связности (coupling); минус: возможны дополнительные методы и обёртки."
          ]
        },
        {
          "title": "TDD: три закона",
          "body": "Test-Driven Development строит код маленькими шагами: сначала минимальный падающий тест, потом достаточно кода для его прохождения, затем улучшение структуры при зелёных тестах.",
          "bullets": [
            "Не пиши production code до появления падающего теста.",
            "Не пиши больше теста, чем нужно для падения; ошибка компиляции тоже считается падением.",
            "Не пиши больше production code, чем нужно для текущего падающего теста.",
            "Автоматические тесты должны сохраняться рядом с кодом и легко запускаться.",
            "Качество тестов важно так же, как качество программы: грязные тесты мешают изменениям."
          ]
        },
        {
          "title": "Читаемый тест: Build–Operate–Check",
          "body": "Хороший тест показывает подготовку, действие и проверку. Убери из него детали, которые не помогают понять проверяемое поведение.",
          "bullets": [
            "Build: подготовь входные данные и зависимости.",
            "Operate: выполни проверяемое действие.",
            "Check: сравни фактический результат с ожидаемым.",
            "Вспомогательные методы могут образовать маленький понятный testing API.",
            "В тестах допустимо предпочесть ясность максимальной эффективности, но не беспорядок.",
            "Подменяй внешние зависимости, например часы, чтобы управлять условиями проверки."
          ]
        },
        {
          "title": "F.I.R.S.T.",
          "body": "Пять свойств качественных тестов помогают быстро замечать ошибки и безопасно менять код.",
          "bullets": [
            "Fast — выполняются быстро.",
            "Independent — не зависят от порядка или результатов других тестов.",
            "Repeatable — дают воспроизводимый результат в нужных окружениях; не опираются на случайную доступность сети.",
            "Self-validating — автоматически говорят pass/fail, без ручного чтения логов.",
            "Timely — при TDD пишутся непосредственно перед соответствующим production code.",
            "Тесты увеличивают уверенность в изменениях, но прохождение тестов не доказывает отсутствие всех ошибок."
          ]
        }
      ]
    },
    {
      "id": "lecture-7",
      "number": 7,
      "title": "Strategy и чистые классы",
      "summary": "Как менять алгоритм во время работы программы, отделять его от клиента и делить классы по ответственности.",
      "minutes": 7,
      "topics": [
        "Strategy",
        "Clean Code",
        "SRP",
        "Cohesion",
        "Dependency Inversion"
      ],
      "sections": [
        {
          "title": "Strategy: одна задача, разные алгоритмы",
          "body": "Strategy — поведенческий паттерн (behavioral pattern). Несколько способов выполнить одну задачу получают общий интерфейс. Контекст (Context) вызывает этот интерфейс, а выбранный объект выполняет алгоритм.",
          "bullets": [
            "Strategy interface задаёт общую операцию; Concrete Strategies реализуют варианты.",
            "Context хранит или получает стратегию и делегирует ей работу. Client выбирает подходящий вариант.",
            "Примеры: скидки, способы оплаты, маршруты, алгоритмы сортировки.",
            "Runtime switching означает замену выбранной стратегии во время работы программы, без замены самого контекста."
          ]
        },
        {
          "title": "Что происходит в Java",
          "body": "В примере Context не вычисляет результат сам: он вызывает apply у текущей стратегии. После setStrategy изменяется следующий результат, а код run остаётся прежним. Лямбда здесь — краткая реализация интерфейса с одним абстрактным методом.",
          "bullets": [
            "Вывод: 7, затем 12.",
            "Стратегию нужно установить до выполнения; иначе вызов через null завершится ошибкой."
          ],
          "code": "interface Operation { int apply(int a, int b); }\nclass Calculator {\n  private Operation strategy;\n  Calculator(Operation strategy) { this.strategy = strategy; }\n  void setStrategy(Operation strategy) { this.strategy = strategy; }\n  int run(int a, int b) { return strategy.apply(a, b); }\n}\n// Inside main:\nCalculator c = new Calculator((a, b) -> a + b);\nSystem.out.println(c.run(3, 4)); // 7\nc.setStrategy((a, b) -> a * b);\nSystem.out.println(c.run(3, 4)); // 12"
        },
        {
          "title": "Когда применять и с чем не путать",
          "body": "Strategy полезна, когда варианты алгоритма часто меняются или один класс разрастается из-за выбора между ними. Она использует композицию (composition): контекст содержит объект стратегии, а не наследуется от каждого варианта.",
          "bullets": [
            "Новый вариант можно добавить отдельной реализацией, не меняя алгоритмический код контекста: Open/Closed Principle. Код выбора или конфигурация при этом могут потребовать изменения.",
            "Цена решения: дополнительные классы, а клиент должен понимать различия между стратегиями. Для двух простых стабильных вариантов паттерн может быть лишним.",
            "Template Method меняет шаги алгоритма через наследование; Strategy подставляет алгоритм через композицию.",
            "Command представляет действие как объект, например для очереди или undo; Strategy представляет альтернативный способ выполнить одну задачу."
          ]
        },
        {
          "title": "Clean Code: организация и инкапсуляция",
          "body": "Сначала показывай читателю назначение класса, затем детали. В лекции предложен порядок: public static constants, private static fields, private instance fields, public methods и связанные private helpers. Это рекомендация для чтения, а не требование синтаксиса Java.",
          "bullets": [
            "Encapsulation: поля и служебные методы по умолчанию private; наружу открывается только необходимый контракт.",
            "Stepdown rule: после высокоуровневого метода удобно расположить вспомогательные методы, которые он вызывает.",
            "Размер класса оценивают прежде всего числом ответственностей, а не только количеством строк."
          ]
        },
        {
          "title": "SRP и cohesion",
          "body": "Single Responsibility Principle: у класса должна быть одна причина для изменения. High cohesion означает, что его данные и методы работают на одну понятную цель.",
          "bullets": [
            "Если класс и считает цены, и форматирует отчёт, изменения правил расчёта и оформления могут стать двумя независимыми причинами менять его.",
            "Если одна группа методов использует только одну группу полей, а другая — другую, это признак возможного разделения класса.",
            "Много небольших связанных по смыслу классов лучше одного класса с несвязанными обязанностями; количество файлов само по себе не показывает качество."
          ]
        },
        {
          "title": "Изолируй то, что меняется",
          "body": "Dependency Inversion Principle: высокоуровневая логика и низкоуровневые детали зависят от абстракций. Например, PortfolioManager получает цены через StockExchange, а не напрямую через конкретный внешний API.",
          "bullets": [
            "Интерфейс позволяет подставить тестовую реализацию без настоящей сети.",
            "Можно заменить провайдера данных, сохранив контракт клиента.",
            "На квизе ищи делегирование, текущую выбранную стратегию, лишние ответственности и прямые зависимости от конкретных классов."
          ]
        }
      ],
      "source": "Lecture 7 (1).pdf",
      "pages": "1–43"
    },
    {
      "id": "lecture-8",
      "number": 8,
      "title": "Observer и архитектура систем",
      "summary": "Подписка на события, слабая связанность, управление жизнью подписчиков и отделение сборки системы от её работы.",
      "minutes": 8,
      "topics": [
        "Observer",
        "Clean Code",
        "Dependency Injection",
        "AOP",
        "Separation of Concerns"
      ],
      "sections": [
        {
          "title": "Observer: один источник, много подписчиков",
          "body": "Observer — поведенческий паттерн. Subject, или Publisher, сообщает о событии зарегистрированным Observer, или Subscriber. Например, WeatherStation хранит погоду, а несколько дисплеев обновляются после изменения измерений.",
          "bullets": [
            "Publisher хранит подписчиков и предлагает subscribe, unsubscribe и notify.",
            "Observer interface задаёт метод update; конкретные наблюдатели решают, что делать с событием.",
            "Связь one-to-many относится к одному издателю и его подписчикам; один объект может наблюдать несколько издателей.",
            "Издателю нужен общий интерфейс подписчика, а не знание его конкретного класса."
          ]
        },
        {
          "title": "Подписка и отписка в Java",
          "body": "После отписки наблюдатель больше не получает последующие события от этого издателя. В примере сначала получают событие оба слушателя, затем только Kitchen. Сохранённая ссылка customer позволяет удалить именно зарегистрированный объект.",
          "bullets": [
            "Вывод: Customer PLACED; Kitchen PLACED; Kitchen READY.",
            "Обход копии списка помогает избежать изменения самого списка во время этого обхода. Отписка действует на следующие уведомления; уже созданная копия остаётся прежней."
          ],
          "code": "interface Listener { void update(String status); }\nclass Events {\n  private final java.util.List<Listener> listeners = new java.util.ArrayList<>();\n  void subscribe(Listener l) { listeners.add(l); }\n  void unsubscribe(Listener l) { listeners.remove(l); }\n  void publish(String s) {\n    for (Listener l : java.util.List.copyOf(listeners)) l.update(s);\n  }\n}\n// Inside main:\nEvents events = new Events();\nListener customer = s -> System.out.println(\"Customer \" + s);\nListener kitchen = s -> System.out.println(\"Kitchen \" + s);\nevents.subscribe(customer);\nevents.subscribe(kitchen);\nevents.publish(\"PLACED\");\nevents.unsubscribe(customer);\nevents.publish(\"READY\");"
        },
        {
          "title": "Слабая связанность и типы событий",
          "body": "Loose coupling позволяет добавить новый вид слушателя без изменения издателя. В примере редактора EventManager хранит отдельные списки для open и save: журнал подписан на открытие, email-слушатель — на сохранение.",
          "bullets": [
            "Регистрируй слушателя для нужного события: подписка на open сама по себе не означает подписку на save.",
            "Publisher может передать данные события аргументами update.",
            "Сначала обновляется состояние, затем рассылается событие, чтобы наблюдатели видели актуальные данные.",
            "Observer не требует внешнего брокера сообщений. Архитектура publish–subscribe с брокером обычно отделяет отправителей от получателей ещё сильнее."
          ]
        },
        {
          "title": "Ограничения Observer",
          "body": "Большое число подписчиков или частые события увеличивают стоимость уведомлений. Паттерн сам по себе не обещает конкретный порядок, асинхронность или доставку через сеть: это определяется реализацией.",
          "bullets": [
            "В показанном обычном цикле вызовы синхронные: медленный update задерживает последующие вызовы.",
            "Если нужна последовательность реакций, задай её явно; не рассчитывай на неё только из-за названия паттерна.",
            "Долгоживущий издатель удерживает ссылки на подписчиков. Отписывай ненужные объекты; weak references подходят лишь при осознанном управлении жизненным циклом.",
            "Mediator координирует взаимодействия компонентов; Observer организует подписку и уведомления о событиях."
          ]
        },
        {
          "title": "Clean Code: construction отдельно от use",
          "body": "Создание и соединение объектов — отдельная задача от выполнения бизнес-операций. Main или специальная конфигурация собирают систему, а приложение использует уже подготовленные зависимости.",
          "bullets": [
            "new ConcreteService внутри бизнес-метода жёстко связывает его с реализацией и затрудняет подмену в тестах.",
            "Dependency Injection (DI): объект получает зависимость через конструктор или setter, вместо того чтобы искать или создавать её сам.",
            "Factory помогает, когда приложение должно решать, когда создать объект, но не должно знать детали создания.",
            "Lazy initialization может быть полезна, но скрытое создание конкретной зависимости смешивает её создание и использование."
          ]
        },
        {
          "title": "POJO, cross-cutting concerns и AOP",
          "body": "Бизнес-логику удобно писать как POJO — обычные Java-объекты с минимальной зависимостью от инфраструктурных фреймворков. Logging, security, transactions и persistence могут затрагивать сразу много компонентов: это cross-cutting concerns.",
          "bullets": [
            "Aspect-Oriented Programming (AOP) выносит такое сквозное поведение в отдельные механизмы и подключает его в нужных точках.",
            "Proxy или обёртки могут добавить техническое поведение вокруг вызова бизнес-объекта.",
            "DI связывает зависимости; AOP добавляет сквозное поведение. Это разные задачи.",
            "Смешение доменной логики с обязательными методами и типами контейнера затрудняет самостоятельное тестирование и повторное использование."
          ]
        },
        {
          "title": "Развивай архитектуру постепенно",
          "body": "Реализуй сегодняшние требования, проверяй их тестами и затем расширяй систему. Разделение ответственности позволяет менять отдельные части без переписывания всего приложения.",
          "bullets": [
            "Откладывай необязательные решения до момента, когда появится достаточно информации, а не пытайся заранее угадать все требования.",
            "Стандарты полезны, если помогают задаче; сложность ради стандарта не является целью.",
            "DSL (domain-specific language) приближает описание решения к понятиям предметной области.",
            "На квизе отслеживай текущий список подписчиков, тип события и то, кто создаёт зависимости."
          ]
        }
      ],
      "source": "Lecture 8 (3).pdf",
      "pages": "1–52"
    }
  ],
  "sets": [
    {
      "id": "import-1",
      "title": "Квиз 1 · Adapter",
      "description": "40 исходных вопросов об Adapter. Ключи восстановлены по смыслу вопросов: в прикреплённом файле готовых правильных ответов нет.",
      "count": 40
    },
    {
      "id": "import-2",
      "title": "Квиз 2 · Паттерны и Clean Code",
      "description": "40 исходных вопросов: Builder, фабрики, Adapter, Bridge, Decorator и чистый код. Ответы из обратной связи квиза.",
      "count": 40
    },
    {
      "id": "import-3",
      "title": "Квиз 3 · Observer",
      "description": "40 исходных вопросов о подписках, уведомлениях и чтении Java-кода. Ответы из обратной связи квиза.",
      "count": 40
    },
    {
      "id": "import-4",
      "title": "Квиз 4 · Итоговая практика",
      "description": "40 исходных вопросов: Facade, Strategy, Observer, Visitor, SOLID, тесты и Git. Ответы из обратной связи квиза.",
      "count": 40
    }
  ],
  "questions": [
    {
      "id": "import-1-1",
      "set": "import-1",
      "number": 1,
      "prompt": "What does an adapter do after receiving a request from the client?",
      "options": [
        "It translates the request into the format expected by the adaptee",
        "It deletes the request and creates a new client",
        "It modifies the operating system",
        "It forces the client to use the adaptee interface directly"
      ],
      "answer": 0,
      "explanation": "Adapter переводит запрос клиента в вызов, который понимает Adaptee.",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 1, вопрос 1",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "inferred"
    },
    {
      "id": "import-1-2",
      "set": "import-1",
      "number": 2,
      "prompt": "Why might an Adapter be undesirable in a performance-critical application?",
      "options": [
        "It removes all existing business logic",
        "It always doubles the memory of every object",
        "It always prevents the program from compiling",
        "It may introduce minor additional overhead"
      ],
      "answer": 3,
      "explanation": "Дополнительный слой вызовов и преобразований может немного увеличить время работы.",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 1, вопрос 2",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "inferred"
    },
    {
      "id": "import-1-3",
      "set": "import-1",
      "number": 3,
      "prompt": "Which advantage of Adapter is associated with the Single Responsibility Principle?",
      "options": [
        "It guarantees zero runtime overhead",
        "It removes all interfaces from the system",
        "It separates interface/data conversion code from primary business logic",
        "It forces business logic and conversion code into the same class"
      ],
      "answer": 2,
      "explanation": "SRP: преобразование интерфейса отделено от основной бизнес-логики.",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 1, вопрос 3",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "inferred"
    },
    {
      "id": "import-1-4",
      "set": "import-1",
      "number": 4,
      "prompt": "How does Adapter support the Open/Closed Principle according to the lecture?",
      "options": [
        "Every new adapter requires rewriting all client classes",
        "It requires deleting the original Adaptee",
        "New adapter types can be introduced without modifying existing client code",
        "It prevents any class from being extended"
      ],
      "answer": 2,
      "explanation": "Новый адаптер реализует знакомый клиенту интерфейс, поэтому существующий клиент не нужно переписывать.",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 1, вопрос 4",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "inferred"
    },
    {
      "id": "import-1-5",
      "set": "import-1",
      "number": 5,
      "prompt": "What mechanism is the Object Adapter based on?",
      "options": [
        "Composition",
        "Multiple inheritance only",
        "Static global state",
        "Recursive inheritance"
      ],
      "answer": 0,
      "explanation": "Object Adapter использует композицию: хранит ссылку на адаптируемый объект.",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 1, вопрос 5",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "inferred"
    },
    {
      "id": "import-1-6",
      "set": "import-1",
      "number": 6,
      "prompt": "In the generic Adapter diagram, which method belongs to the Adaptee?",
      "options": [
        "SpecificRequest()",
        "Request()",
        "processPayment()",
        "clientCode()"
      ],
      "answer": 0,
      "explanation": "В стандартной схеме Adaptee предоставляет SpecificRequest(), а Target — Request().",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 1, вопрос 6",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "inferred"
    },
    {
      "id": "import-1-7",
      "set": "import-1",
      "number": 7,
      "prompt": "When does the lecture say an Adapter may add unnecessary complexity?",
      "options": [
        "When interface translation is required",
        "When using an existing incompatible third-party library",
        "When the system is simple and all components already work together",
        "When integrating a legacy system with a new interface"
      ],
      "answer": 2,
      "explanation": "Если интерфейсы уже совместимы, дополнительный адаптер может лишь усложнить простую систему.",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 1, вопрос 7",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "inferred"
    },
    {
      "id": "import-1-8",
      "set": "import-1",
      "number": 8,
      "prompt": "In the Square Peg Adapter pseudocode, what value does SquarePegAdapter.getRadius() return for a square peg of width w?",
      "options": [
        "w × 2",
        "w²",
        "w × √2 / 2",
        "w / 2"
      ],
      "answer": 2,
      "explanation": "Радиус описанной вокруг квадрата окружности равен половине диагонали: w × √2 / 2.",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 1, вопрос 8",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "inferred"
    },
    {
      "id": "import-1-9",
      "set": "import-1",
      "number": 9,
      "prompt": "Which sequence best matches the Adapter workflow described in the lecture?",
      "options": [
        "Client request → Adapter translates → Adaptee performs work → Client receives result",
        "Adaptee request → Client translates → Adapter is deleted → Target performs work",
        "Adapter creates a new Client → Client becomes Adaptee → request is ignored",
        "Client modifies Adaptee source → Target is removed → Adapter returns nothing"
      ],
      "answer": 0,
      "explanation": "Клиент обращается к Adapter; тот переводит вызов для Adaptee, который выполняет работу.",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 1, вопрос 9",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "inferred"
    },
    {
      "id": "import-1-10",
      "set": "import-1",
      "number": 10,
      "prompt": "When integrating a legacy or third-party system, what role does the Adapter play?",
      "options": [
        "A middle-layer translator between your code and the external interface",
        "A database backup mechanism",
        "A replacement for every client class",
        "A compiler optimization pass"
      ],
      "answer": 0,
      "explanation": "Adapter служит переводчиком между интерфейсом вашего приложения и внешнего компонента.",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 1, вопрос 10",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "inferred"
    },
    {
      "id": "import-1-11",
      "set": "import-1",
      "number": 11,
      "prompt": "Which Adapter implementation does the lecture describe as preferred in languages such as Java and C#?",
      "options": [
        "Class Adapter based on multiple class inheritance",
        "Only Two-way Adapter",
        "Object Adapter",
        "No Adapter implementation"
      ],
      "answer": 2,
      "explanation": "Object Adapter с композицией удобен в Java и C#, где нельзя наследовать несколько классов.",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 1, вопрос 11",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "inferred"
    },
    {
      "id": "import-1-12",
      "set": "import-1",
      "number": 12,
      "prompt": "In the power-plug analogy, what role does the physical plug adapter represent?",
      "options": [
        "A client that refuses to use the socket",
        "A replacement for the electrical device",
        "A bridge between incompatible interfaces",
        "A new power-generation system"
      ],
      "answer": 2,
      "explanation": "Переходник соединяет несовместимые интерфейсы устройства и розетки.",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 1, вопрос 12",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "inferred"
    },
    {
      "id": "import-1-13",
      "set": "import-1",
      "number": 13,
      "prompt": "In a correctly applied Adapter pattern, what does the Client normally know about the Adapter and Adaptee details?",
      "options": [
        "The Client must rewrite the Adaptee before every request",
        "The Client must inherit from the Adapter",
        "The Client must directly call every Adaptee method",
        "The Client remains unaware of their implementation details"
      ],
      "answer": 3,
      "explanation": "Клиент работает через Target и не обязан знать детали адаптации и Adaptee.",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 1, вопрос 13",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "inferred"
    },
    {
      "id": "import-1-14",
      "set": "import-1",
      "number": 14,
      "prompt": "What language feature is required for the Class Adapter structure described in the lecture?",
      "options": [
        "Operator overloading only",
        "Multiple inheritance",
        "Dynamic typing",
        "Garbage collection"
      ],
      "answer": 1,
      "explanation": "Классический Class Adapter из такой схемы наследует Target и Adaptee, используя множественное наследование.",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 1, вопрос 14",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "inferred"
    },
    {
      "id": "import-1-15",
      "set": "import-1",
      "number": 15,
      "prompt": "According to the lecture, the Adapter pattern is especially useful when working with:",
      "options": [
        "Legacy code or third-party libraries",
        "Only user interface color themes",
        "Only newly written classes with identical interfaces",
        "Only database tables"
      ],
      "answer": 0,
      "explanation": "Adapter особенно полезен, когда интерфейс уже существующей библиотеки нельзя удобно изменить.",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 1, вопрос 15",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "inferred"
    },
    {
      "id": "import-1-16",
      "set": "import-1",
      "number": 16,
      "prompt": "Why is the Adapter pattern often referred to as a “Wrapper”?",
      "options": [
        "Because it encrypts the wrapped object's data",
        "Because it wraps an incompatible object and hides conversion complexity",
        "Because it duplicates every method of the client",
        "Because it removes the original object from the program"
      ],
      "answer": 1,
      "explanation": "Обёртка скрывает несовместимый объект и детали преобразования от клиента.",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 1, вопрос 16",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "inferred"
    },
    {
      "id": "import-1-17",
      "set": "import-1",
      "number": 17,
      "prompt": "What is the Target Interface in the Adapter pattern?",
      "options": [
        "The interface anticipated by the client",
        "The existing incompatible class",
        "The interface that must never be used by the client",
        "The object that always stores database data"
      ],
      "answer": 0,
      "explanation": "Target — интерфейс, с которым клиент ожидает работать.",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 1, вопрос 17",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "inferred"
    },
    {
      "id": "import-1-18",
      "set": "import-1",
      "number": 18,
      "prompt": "What is the central integration problem described in the lecture's vendor-library scenario?",
      "options": [
        "The client cannot create any objects",
        "The vendor library uses the same interface as the existing system",
        "The existing system has no classes at all",
        "The existing system and the vendor library use incompatible interfaces"
      ],
      "answer": 3,
      "explanation": "Проблема интеграции — несовпадение ожидаемого интерфейса и интерфейса библиотеки.",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 1, вопрос 18",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "inferred"
    },
    {
      "id": "import-1-19",
      "set": "import-1",
      "number": 19,
      "prompt": "What is the main purpose of an Interface Adapter (Default Adapter)?",
      "options": [
        "To convert a class into a database table",
        "To eliminate interfaces from the application",
        "To force the client to implement every method twice",
        "To provide default implementations for interface methods that are not needed"
      ],
      "answer": 3,
      "explanation": "Default Adapter даёт базовые реализации методов; подкласс переопределяет только нужные ему.",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 1, вопрос 19",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "inferred"
    },
    {
      "id": "import-1-20",
      "set": "import-1",
      "number": 20,
      "prompt": "Why is the inheritance-based Class Adapter rarely applied in Java and C# according to the lecture?",
      "options": [
        "They do not support interfaces",
        "These languages restrict multiple inheritance of classes",
        "They require every class to be an Adapter",
        "They cannot create objects"
      ],
      "answer": 1,
      "explanation": "Java и C# ограничивают наследование классов одним базовым классом; классическая схема множественного наследования не подходит.",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 1, вопрос 20",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "inferred"
    },
    {
      "id": "import-1-21",
      "set": "import-1",
      "number": 21,
      "prompt": "Which language is given in the lecture as an example where Class Adapter is practical because multiple inheritance is supported?",
      "options": [
        "C++",
        "C#",
        "SQL",
        "Java"
      ],
      "answer": 0,
      "explanation": "C++ поддерживает множественное наследование классов, используемое классическим Class Adapter.",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 1, вопрос 21",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "inferred"
    },
    {
      "id": "import-1-22",
      "set": "import-1",
      "number": 22,
      "prompt": "Which disadvantage of the Adapter pattern is identified in the lecture?",
      "options": [
        "It can increase complexity by introducing new interfaces and classes",
        "It removes the possibility of composition",
        "It requires modifying every legacy class",
        "It always makes reuse impossible"
      ],
      "answer": 0,
      "explanation": "Преобразование требует дополнительных типов и уровней взаимодействия, поэтому структура может стать сложнее.",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 1, вопрос 22",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "inferred"
    },
    {
      "id": "import-1-23",
      "set": "import-1",
      "number": 23,
      "prompt": "In the lecture's memory-card example, what does a USB card reader do?",
      "options": [
        "Changes the laptop operating system",
        "Translates the SD-card interface into USB",
        "Converts USB into XML",
        "Replaces the SD card with a hard drive"
      ],
      "answer": 1,
      "explanation": "Кардридер представляет интерфейс SD-карты компьютеру через USB.",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 1, вопрос 23",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "inferred"
    },
    {
      "id": "import-1-24",
      "set": "import-1",
      "number": 24,
      "prompt": "In the lecture's generic Adapter diagram, which method does the Client call on the Target interface?",
      "options": [
        "Request()",
        "printDocument()",
        "gobble()",
        "SpecificRequest()"
      ],
      "answer": 0,
      "explanation": "Клиент вызывает Request() из Target; адаптер преобразует его в SpecificRequest() у Adaptee.",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 1, вопрос 24",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "inferred"
    },
    {
      "id": "import-1-25",
      "set": "import-1",
      "number": 25,
      "prompt": "Which statement matches the lecture's comparison of Adapter and Facade?",
      "options": [
        "Facade changes an interface only through multiple inheritance, while Adapter cannot wrap objects",
        "Adapter and Facade are identical and always wrap the same number of objects",
        "Adapter makes an existing interface usable and typically wraps one object; Facade provides a new interface to a subsystem of objects",
        "Adapter is used only before an application is designed, while Facade is used only after deployment"
      ],
      "answer": 2,
      "explanation": "Adapter согласует несовместимый интерфейс, Facade упрощает использование подсистемы. Число обёрнутых объектов — типичная ситуация, а не строгое правило.",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 1, вопрос 25",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "inferred"
    },
    {
      "id": "import-1-26",
      "set": "import-1",
      "number": 26,
      "prompt": "What is the Adaptee?",
      "options": [
        "A class used only to create subclasses",
        "The client-facing interface expected by the program",
        "A class whose only purpose is to test the client",
        "An existing class with an incompatible interface that needs integration"
      ],
      "answer": 3,
      "explanation": "Adaptee — существующий полезный класс, интерфейс которого не совпадает с ожидаемым.",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 1, вопрос 26",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "inferred"
    },
    {
      "id": "import-1-27",
      "set": "import-1",
      "number": 27,
      "prompt": "An e-commerce platform expects processPayment(), but Stripe exposes charge(). What should a StripeAdapter expose to the application?",
      "options": [
        "processPayment()",
        "printDocument()",
        "getRadius()",
        "chargeOnly()"
      ],
      "answer": 0,
      "explanation": "Приложение ожидает processPayment(); внутри адаптер делегирует работу методу charge().",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 1, вопрос 27",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "inferred"
    },
    {
      "id": "import-1-28",
      "set": "import-1",
      "number": 28,
      "prompt": "In the LegacyPrinter example, what translation does PrinterAdapter perform?",
      "options": [
        "Printer.print() is translated into LegacyPrinter.printDocument()",
        "LegacyPrinter.printDocument() is translated into Client.main()",
        "LegacyPrinter.printDocument() is translated into Turkey.gobble()",
        "Printer.print() is translated into RoundPeg.getRadius()"
      ],
      "answer": 0,
      "explanation": "PrinterAdapter принимает print() и вызывает printDocument() у LegacyPrinter.",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 1, вопрос 28",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "inferred"
    },
    {
      "id": "import-1-29",
      "set": "import-1",
      "number": 29,
      "prompt": "In an Object Adapter, how does the Adapter access the incompatible service object?",
      "options": [
        "It removes the service object after each call",
        "It holds a reference to the service object",
        "It copies the entire service source code into the client",
        "It requires the service to inherit from the client"
      ],
      "answer": 1,
      "explanation": "Object Adapter хранит ссылку на Adaptee и через неё делегирует работу.",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 1, вопрос 29",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "inferred"
    },
    {
      "id": "import-1-30",
      "set": "import-1",
      "number": 30,
      "prompt": "A modern application expects JSON, while a legacy system outputs XML. What should the adapter do?",
      "options": [
        "Convert XML into JSON for the modern application",
        "Replace both systems with a database",
        "Force the modern application to output XML",
        "Delete the legacy system's output"
      ],
      "answer": 0,
      "explanation": "Адаптер преобразует полученный XML в JSON, который понимает клиент.",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 1, вопрос 30",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "inferred"
    },
    {
      "id": "import-1-31",
      "set": "import-1",
      "number": 31,
      "prompt": "In the Duck-and-Turkey example, which pair of methods belongs to the Duck interface?",
      "options": [
        "Request() and SpecificRequest()",
        "gobble() and flyShort()",
        "print() and printDocument()",
        "quack() and fly()"
      ],
      "answer": 3,
      "explanation": "В этом примере Duck объявляет quack() и fly().",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 1, вопрос 31",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "inferred"
    },
    {
      "id": "import-1-32",
      "set": "import-1",
      "number": 32,
      "prompt": "Which situation is a good reason to use the Adapter pattern?",
      "options": [
        "You want to reuse an existing class whose interface does not match your system",
        "You want to remove all interfaces from the program",
        "You want to add complexity to a throwaway script for no integration reason",
        "All components already have fully compatible interfaces"
      ],
      "answer": 0,
      "explanation": "Adapter подходит, когда нужно повторно использовать класс с несовместимым интерфейсом.",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 1, вопрос 32",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "inferred"
    },
    {
      "id": "import-1-33",
      "set": "import-1",
      "number": 33,
      "prompt": "What distinguishes a Two-way Adapter?",
      "options": [
        "It must use exactly two databases",
        "It works only with two clients and no Adaptee",
        "It can act as both the Target and the Adaptee depending on the accessed interface",
        "It can only translate requests in one fixed direction"
      ],
      "answer": 2,
      "explanation": "Two-way Adapter поддерживает взаимодействие через оба согласуемых интерфейса.",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 1, вопрос 33",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "inferred"
    },
    {
      "id": "import-1-34",
      "set": "import-1",
      "number": 34,
      "prompt": "What is important about testDuck() in the TurkeyAdapter example?",
      "options": [
        "It bypasses the Adapter and calls gobble() directly",
        "It uses the adapted Turkey through the Duck interface without knowing it is a Turkey",
        "It directly edits the Turkey class before every call",
        "It can only accept Turkey objects"
      ],
      "answer": 1,
      "explanation": "testDuck() зависит от Duck, поэтому может использовать TurkeyAdapter без знания о Turkey.",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 1, вопрос 34",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "inferred"
    },
    {
      "id": "import-1-35",
      "set": "import-1",
      "number": 35,
      "prompt": "What mechanism is the Class Adapter based on?",
      "options": [
        "Database normalization",
        "Inheritance",
        "Composition only",
        "Global variables"
      ],
      "answer": 1,
      "explanation": "Class Adapter основан на наследовании; Object Adapter — на композиции.",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 1, вопрос 35",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "inferred"
    },
    {
      "id": "import-1-36",
      "set": "import-1",
      "number": 36,
      "prompt": "Which interface does TurkeyAdapter implement?",
      "options": [
        "Turkey only",
        "Printer",
        "RoundHole",
        "Duck"
      ],
      "answer": 3,
      "explanation": "TurkeyAdapter реализует Duck — интерфейс, который ожидает клиент.",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 1, вопрос 36",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "inferred"
    },
    {
      "id": "import-1-37",
      "set": "import-1",
      "number": 37,
      "prompt": "What is the main purpose of the Adapter design pattern?",
      "options": [
        "To allow objects with incompatible interfaces to collaborate",
        "To replace inheritance with recursion",
        "To create multiple copies of the same object",
        "To hide all objects behind a single global instance"
      ],
      "answer": 0,
      "explanation": "Главная цель Adapter — дать объектам с несовместимыми интерфейсами работать вместе.",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 1, вопрос 37",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "inferred"
    },
    {
      "id": "import-1-38",
      "set": "import-1",
      "number": 38,
      "prompt": "How does the Adapter bridge the Target and the Adaptee in the generic example?",
      "options": [
        "It makes the Client inherit from the Adaptee",
        "It implements Request() and internally calls SpecificRequest()",
        "It forces the Adaptee to implement the Client class",
        "It removes both Request() and SpecificRequest()"
      ],
      "answer": 1,
      "explanation": "Adapter реализует Request() и внутри вызывает специфичный метод Adaptee.",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 1, вопрос 38",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "inferred"
    },
    {
      "id": "import-1-39",
      "set": "import-1",
      "number": 39,
      "prompt": "What does TurkeyAdapter.quack() call internally?",
      "options": [
        "duck.gobble()",
        "legacyPrinter.printDocument()",
        "turkey.gobble()",
        "turkey.quack()"
      ],
      "answer": 2,
      "explanation": "Вместо утиного quack() адаптер вызывает gobble() у индейки.",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 1, вопрос 39",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "inferred"
    },
    {
      "id": "import-1-40",
      "set": "import-1",
      "number": 40,
      "prompt": "How does the lecture's TurkeyAdapter simulate a Duck's longer flight?",
      "options": [
        "It calls turkey.fly() once",
        "It replaces the Turkey with a Duck",
        "It calls quack() five times",
        "It calls turkey.fly() five times"
      ],
      "answer": 3,
      "explanation": "Один длинный полёт Duck имитируется пятью короткими вызовами turkey.fly().",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 1, вопрос 40",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "inferred"
    },
    {
      "id": "import-2-1",
      "set": "import-2",
      "number": 1,
      "prompt": "A base Price returns 100. DiscountDecorator returns 0.9 * wrapped.cost(); FeeDecorator returns wrapped.cost() + 10. What does the code print?\n\nPrice a = new FeeDecorator(\n    new DiscountDecorator(new BasePrice())\n);\nPrice b = new DiscountDecorator(\n    new FeeDecorator(new BasePrice())\n);\nSystem.out.println(a.cost());\nSystem.out.println(b.cost());",
      "options": [
        "99.0 then 100.0",
        "110.0 then 90.0",
        "100.0 then 99.0",
        "100.0 then 100.0"
      ],
      "answer": 2,
      "explanation": "Для a: 100 × 0.9 + 10 = 100. Для b: (100 + 10) × 0.9 = 99. Порядок декораторов влияет на результат.",
      "topic": "Decorator",
      "source": "Прикреплённый квиз 2, вопрос 1",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-2-2",
      "set": "import-2",
      "number": 2,
      "prompt": "A method named generateReport() retrieves records, manually formats each HTML tag, and writes the file. Which refactoring best follows the lecture guidance on abstraction levels?",
      "options": [
        "Extract named helpers so generateReport() reads as a sequence of high-level operations.",
        "Split the method into equal-sized chunks regardless of each chunk's responsibility.",
        "Extract only file writing, while leaving record retrieval and low-level HTML assembly together.",
        "Keep all operations in one method and use comments to label the different abstraction levels."
      ],
      "answer": 0,
      "explanation": "Высокоуровневая функция должна состоять из понятных шагов; детали HTML и записи выносятся в именованные методы.",
      "topic": "Clean Code",
      "source": "Прикреплённый квиз 2, вопрос 2",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-2-3",
      "set": "import-2",
      "number": 3,
      "prompt": "A LegacyPrinter base class has two subclasses, NetworkPrinter and UsbPrinter, each overriding printDocument(). You want one PrinterAdapter implementation to adapt either supplied subclass instance. Which design best supports this?",
      "options": [
        "Implement Printer, store a supplied LegacyPrinter reference, and delegate print() to its printDocument().",
        "Extend NetworkPrinter and hard-code all adaptation to that inherited implementation.",
        "Implement Printer and create a new NetworkPrinter inside print(), ignoring the supplied instance.",
        "Store the supplied LegacyPrinter but select its exact subclass with instanceof before copying its printing logic."
      ],
      "answer": 0,
      "explanation": "Ссылка типа LegacyPrinter принимает оба подкласса, а вызов printDocument() выбирает их переопределённую реализацию.",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 2, вопрос 3",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-2-4",
      "set": "import-2",
      "number": 4,
      "prompt": "PlainCoffee costs 2.00. Each MilkDecorator adds 0.50, and SugarDecorator adds 0.20, to its wrapped cost. What is this order's total cost, rounded to two decimal places?\n\nCoffee order = new SugarDecorator(\n    new MilkDecorator(\n        new MilkDecorator(new PlainCoffee())\n    )\n);\n// Evaluate order.getCost().",
      "options": [
        "3.20",
        "1.20",
        "2.20",
        "2.70"
      ],
      "answer": 0,
      "explanation": "Каждая обёртка добавляет свою цену: 2.00 + 0.50 + 0.50 + 0.20 = 3.20.",
      "topic": "Decorator",
      "source": "Прикреплённый квиз 2, вопрос 4",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-2-5",
      "set": "import-2",
      "number": 5,
      "prompt": "TurkeyAdapter implements Duck. Its quack() delegates to turkey.gobble(), and its fly() calls turkey.fly() five times. A client calls quack() once and fly() once on the adapter. What happens?",
      "options": [
        "Five gobble calls and five short-flight calls, because both methods are expanded equally.",
        "One Duck quack call and five short-flight calls, because the adapter inherits a duck sound.",
        "One gobble call and one short-flight call, because adaptation changes only method names.",
        "One gobble call and five short-flight calls."
      ],
      "answer": 3,
      "explanation": "quack() вызывает gobble() один раз, а fly() переводится в пять коротких полётов.",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 2, вопрос 5",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-2-6",
      "set": "import-2",
      "number": 6,
      "prompt": "Why do a CoffeeDecorator and a PlainCoffee both implement the Coffee interface?",
      "options": [
        "So the decorator inherits the complete concrete component implementation rather than delegating.",
        "So the client can identify each decorator type and explicitly invoke its wrapped object.",
        "So a decorator must wrap a concrete component directly and cannot accept another decorator.",
        "So a decorator can replace a component and can also wrap another decorator."
      ],
      "answer": 3,
      "explanation": "Общий интерфейс позволяет использовать декоратор вместо компонента и оборачивать другие декораторы.",
      "topic": "Decorator",
      "source": "Прикреплённый квиз 2, вопрос 6",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-2-7",
      "set": "import-2",
      "number": 7,
      "prompt": "PlainCoffee.cost() returns 2.00. Milk.cost() returns wrapped.cost() + 0.50, and Sugar.cost() returns wrapped.cost() + 0.20. These decorators do not mutate their wrapped objects. What does the code print?\n\nCoffee first = new Milk(new PlainCoffee());\nCoffee second = first;\nsecond = new Sugar(second);\nSystem.out.println(first.cost());\nSystem.out.println(second.cost());",
      "options": [
        "2.5 then 2.7",
        "2.5 then 2.2",
        "2.2 then 2.7",
        "2.7 then 2.7"
      ],
      "answer": 0,
      "explanation": "first остаётся ссылкой на Milk с ценой 2.5. Только second получает внешнюю Sugar-обёртку: 2.7.",
      "topic": "Decorator",
      "source": "Прикреплённый квиз 2, вопрос 7",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-2-8",
      "set": "import-2",
      "number": 8,
      "prompt": "A design has 4 shape types and 3 rendering backends. A subclass-per-combination approach needs 12 combination classes. With Bridge, how many concrete variant classes represent these two dimensions, excluding shared base classes and interfaces?",
      "options": [
        "3: the shape classes are no longer needed.",
        "4: the renderer classes are no longer needed.",
        "7: four shape classes plus three renderer classes.",
        "12: one class for every shape-renderer pair."
      ],
      "answer": 2,
      "explanation": "Bridge хранит варианты отдельно: четыре фигуры плюс три способа рисования дают семь конкретных классов.",
      "topic": "Bridge",
      "source": "Прикреплённый квиз 2, вопрос 8",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-2-9",
      "set": "import-2",
      "number": 9,
      "prompt": "A client must work with either a native Printer or a PrinterAdapter wrapping a LegacyPrinter. What parameter type best keeps the client independent of that choice?",
      "options": [
        "LegacyPrinter, because every adapted object must inherit from the adaptee.",
        "PrinterAdapter, because using its concrete type is necessary to hide LegacyPrinter.",
        "Object, followed by an instanceof check for each concrete implementation.",
        "Printer."
      ],
      "answer": 3,
      "explanation": "Обе реализации доступны через Printer; зависимость от этого интерфейса скрывает адаптацию.",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 2, вопрос 9",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-2-10",
      "set": "import-2",
      "number": 10,
      "prompt": "PrinterAdapter implements Printer and holds a LegacyPrinter whose method is printDocument(). Which class is the Adaptee?",
      "options": [
        "Printer.",
        "PrinterAdapter.",
        "The client that calls Printer.print().",
        "LegacyPrinter."
      ],
      "answer": 3,
      "explanation": "LegacyPrinter — существующий класс с несовместимым интерфейсом, то есть Adaptee.",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 2, вопрос 10",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-2-11",
      "set": "import-2",
      "number": 11,
      "prompt": "Renderer currently declares only renderCircle(). A new Triangle abstraction needs a renderTriangle() operation. Every backend must support triangles. Which statement correctly describes the effect on this Bridge design?",
      "options": [
        "Add renderTriangle() to Renderer and implement it in every concrete renderer; the two hierarchies remain separate.",
        "Add TriangleRenderer as a Shape subclass and leave Renderer unchanged, eliminating the need for rendering operations.",
        "Create VectorTriangle and RasterTriangle subclasses; Bridge requires every abstraction-implementation pair to have its own class.",
        "Add only Triangle; Bridge guarantees that no implementation interface ever needs to change."
      ],
      "answer": 0,
      "explanation": "Новая операция требует дополнить контракт Renderer и все реализации; Bridge не отменяет зависимости от контракта.",
      "topic": "Bridge",
      "source": "Прикреплённый квиз 2, вопрос 11",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-2-12",
      "set": "import-2",
      "number": 12,
      "prompt": "GUIFactory currently creates Button and Checkbox products. Every platform must now also create a Slider. What change is typically required?",
      "options": [
        "Add a Slider product interface but leave all concrete factories with only the old creation methods.",
        "Add createSlider() to GUIFactory and implement it in each concrete factory.",
        "Replace each existing concrete factory with a Slider subclass and keep the client calls unchanged.",
        "Add only a new SliderFactory family while leaving all existing factory contracts unchanged."
      ],
      "answer": 1,
      "explanation": "Новый тип продукта требует createSlider() в общей фабрике и во всех конкретных фабриках.",
      "topic": "Abstract Factory",
      "source": "Прикреплённый квиз 2, вопрос 12",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-2-13",
      "set": "import-2",
      "number": 13,
      "prompt": "A method named isValidPassword() returns a boolean but also silently resets the user session. Which change best addresses the Clean Code concern?",
      "options": [
        "Add a resetSession boolean parameter to the validation query instead of separating the operations.",
        "Rename it validateAndReset() but continue using it wherever a pure validation query is expected.",
        "Keep validation as a query and move the session reset into an explicit command.",
        "Move the session reset into a private helper while keeping it automatic during validation."
      ],
      "answer": 2,
      "explanation": "Проверка должна возвращать результат без неожиданного сброса сессии; сброс следует сделать отдельной явной командой.",
      "topic": "Clean Code",
      "source": "Прикреплённый квиз 2, вопрос 13",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-2-14",
      "set": "import-2",
      "number": 14,
      "prompt": "A ShapeFactory has one getShape(String type) method containing a switch that constructs Circle or Square. There are no creator subclasses. Which change would introduce the subclass-based Factory Method structure?",
      "options": [
        "Move the switch into a Product superclass and inherit that switch unchanged.",
        "Declare a creation method in a Creator and override it in concrete Creator subclasses.",
        "Create separate product subclasses, but keep all product selection inside the original switch.",
        "Make getShape() static and keep its conditional selection of products."
      ],
      "answer": 1,
      "explanation": "В Factory Method конкретные Creator-подклассы переопределяют метод создания продукта.",
      "topic": "Factory Method",
      "source": "Прикреплённый квиз 2, вопрос 14",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-2-15",
      "set": "import-2",
      "number": 15,
      "prompt": "A Director calls setSeats(), setEngine(), and setGPS(). One builder creates a Car and another creates a CarManual. What makes the same Director reusable for both?",
      "options": [
        "Both completed products implement an identical Product interface, even if the builders have unrelated step methods.",
        "Both builders inherit from the Product class rather than implementing the construction-step interface.",
        "The Director inspects each concrete builder type and constructs each product itself.",
        "Both builders implement the same construction-step interface."
      ],
      "answer": 3,
      "explanation": "Director использует общий интерфейс шагов Builder. Car и CarManual при этом не обязаны иметь общий тип продукта.",
      "topic": "Builder",
      "source": "Прикреплённый квиз 2, вопрос 15",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-2-16",
      "set": "import-2",
      "number": 16,
      "prompt": "A cross-platform application must create a Button and a Checkbox with matching Windows or macOS styles. It should switch the entire set through one supplied object. Which pattern best fits?",
      "options": [
        "Builder.",
        "Adapter.",
        "Decorator.",
        "Abstract Factory."
      ],
      "answer": 3,
      "explanation": "Abstract Factory создаёт согласованное семейство связанных продуктов, например Windows Button и Checkbox.",
      "topic": "Abstract Factory",
      "source": "Прикреплённый квиз 2, вопрос 16",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-2-17",
      "set": "import-2",
      "number": 17,
      "prompt": "Which statement should replace the blank so this object Adapter uses the legacy printing behavior?\n\ninterface Printer { void print(); }\nclass LegacyPrinter {\n    void printDocument() {\n        System.out.println(\"Legacy print\");\n    }\n}\nclass PrinterAdapter implements Printer {\n    private final LegacyPrinter legacyPrinter;\n    PrinterAdapter(LegacyPrinter printer) {\n        this.legacyPrinter = printer;\n    }\n    public void print() {\n        // blank\n    }\n}",
      "options": [
        "legacyPrinter.printDocument();",
        "return;",
        "System.out.println(\"Legacy print\");",
        "this.print();"
      ],
      "answer": 0,
      "explanation": "Адаптер должен делегировать вызов legacyPrinter.printDocument(); this.print() вызвал бы бесконечную рекурсию.",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 2, вопрос 17",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-2-18",
      "set": "import-2",
      "number": 18,
      "prompt": "A client calls ctxt.getOptions().getScratchDir().getAbsolutePath() to prepare a scratch file. Which replacement best reflects the lecture guidance on the Law of Demeter?",
      "options": [
        "Expose all intermediate objects through public fields so traversal requires fewer method calls.",
        "Ask ctxt to perform a higher-level operation such as createScratchFileStream(name).",
        "Store each getter result in a local variable while retaining the same traversal in the client.",
        "Add null checks to each link but retain the same client dependency on the object graph."
      ],
      "answer": 1,
      "explanation": "Высокоуровневая операция ctxt уменьшает знание клиента о внутренних объектах и цепочках связей.",
      "topic": "Clean Code",
      "source": "Прикреплённый квиз 2, вопрос 18",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-2-19",
      "set": "import-2",
      "number": 19,
      "prompt": "A design solution focuses on how objects communicate and how responsibilities are distributed between them. Which category does it belong to?",
      "options": [
        "Structural patterns.",
        "Creational patterns.",
        "Behavioral patterns.",
        "All three pattern categories equally, regardless of the problem being solved."
      ],
      "answer": 2,
      "explanation": "Поведенческие паттерны описывают взаимодействие объектов, алгоритмы и распределение ответственности.",
      "topic": "Design Patterns",
      "source": "Прикреплённый квиз 2, вопрос 19",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-2-20",
      "set": "import-2",
      "number": 20,
      "prompt": "A Bridge-based application must assemble compatible abstraction and implementation objects for several platform configurations. Which additional pattern best encapsulates creation of each compatible family?",
      "options": [
        "Decorator to add a separate wrapper for every abstraction-implementation pair.",
        "Abstract Factory.",
        "Factory Method for one independent product, without any contract connecting the related products.",
        "Adapter to convert every abstraction into every concrete implementation type."
      ],
      "answer": 1,
      "explanation": "Abstract Factory собирает совместимое семейство объектов, а Bridge сохраняет отдельные иерархии.",
      "topic": "Abstract Factory",
      "source": "Прикреплённый квиз 2, вопрос 20",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-2-21",
      "set": "import-2",
      "number": 21,
      "prompt": "Existing Coffee classes and decorators are used by clients through Coffee. You want to add whipped cream. Which change best follows the Open-Closed Principle?",
      "options": [
        "Use instanceof checks in client code to modify the price differently for each concrete coffee class.",
        "Add a method to Coffee for each new add-on and require all component classes to implement it.",
        "Add WhipDecorator implementing the same component contract and select it when composing an order.",
        "Add a whip boolean to the shared base class and update every concrete cost() implementation."
      ],
      "answer": 2,
      "explanation": "Новый WhipDecorator расширяет поведение через прежний интерфейс, не меняя существующие компоненты.",
      "topic": "Decorator",
      "source": "Прикреплённый квиз 2, вопрос 21",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-2-22",
      "set": "import-2",
      "number": 22,
      "prompt": "What is printed by the client code?\n\ninterface Transport { void deliver(); }\nclass Truck implements Transport {\n    public void deliver() { System.out.println(\"Land\"); }\n}\nclass Ship implements Transport {\n    public void deliver() { System.out.println(\"Sea\"); }\n}\nabstract class Logistics {\n    abstract Transport createTransport();\n    void planDelivery() { createTransport().deliver(); }\n}\nclass SeaLogistics extends Logistics {\n    Transport createTransport() { return new Ship(); }\n}\n// Client code:\nLogistics logistics = new SeaLogistics();\nlogistics.planDelivery();",
      "options": [
        "Sea",
        "Land",
        "A compilation error because an abstract-class variable cannot refer to a subclass object.",
        "Sea followed by Land"
      ],
      "answer": 0,
      "explanation": "Вызывается SeaLogistics.createTransport(), создаётся Ship, затем deliver() печатает Sea.",
      "topic": "Factory Method",
      "source": "Прикреплённый квиз 2, вопрос 22",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-2-23",
      "set": "import-2",
      "number": 23,
      "prompt": "A Report has many optional sections, a title, and several formatting settings. Constructors with long parameter lists are becoming difficult to use. Which pattern best organizes its construction?",
      "options": [
        "Builder.",
        "Decorator.",
        "Factory Method.",
        "Abstract Factory."
      ],
      "answer": 0,
      "explanation": "Builder удобно задаёт множество необязательных параметров через отдельные понятные шаги.",
      "topic": "Builder",
      "source": "Прикреплённый квиз 2, вопрос 23",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-2-24",
      "set": "import-2",
      "number": 24,
      "prompt": "In this Bridge design, which element connects the abstraction hierarchy to the implementation hierarchy?\n\ninterface Renderer {\n    void renderCircle(double x, double y, double r);\n}\nabstract class Shape {\n    protected Renderer renderer;\n    protected Shape(Renderer renderer) {\n        this.renderer = renderer;\n    }\n    public abstract void draw();\n}",
      "options": [
        "The abstract draw() declaration, even if Shape holds no Renderer reference.",
        "The inheritance relationship between Circle and Shape.",
        "The implementation relationship between VectorRenderer and Renderer.",
        "The Renderer reference stored in Shape."
      ],
      "answer": 3,
      "explanation": "Ссылка Renderer внутри Shape соединяет две иерархии и позволяет делегировать рисование.",
      "topic": "Bridge",
      "source": "Прикреплённый квиз 2, вопрос 24",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-2-25",
      "set": "import-2",
      "number": 25,
      "prompt": "A method mixes a device shutdown algorithm with repeated checks of integer error codes. Which refactoring best follows the lecture guidance while preserving useful failure information?",
      "options": [
        "Return one generic failure code from every helper and remove information about which operation failed.",
        "Move the normal steps into a helper that throws contextual exceptions and handle them at an appropriate outer level.",
        "Catch every exception at the outer level and suppress it so the normal path always appears successful.",
        "Replace each error code with an exception, immediately catch it inside the same step, and continue without reporting failure."
      ],
      "answer": 1,
      "explanation": "Основной алгоритм остаётся читаемым, а исключения с контекстом обрабатываются отдельно без потери информации об ошибке.",
      "topic": "Clean Code",
      "source": "Прикреплённый квиз 2, вопрос 25",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-2-26",
      "set": "import-2",
      "number": 26,
      "prompt": "Circle.draw() should use the Renderer supplied to its constructor. Which replacement for the current method body best preserves the Bridge?\n\nclass Circle extends Shape {\n    private double x, y, radius;\n    Circle(double x, double y, double r, Renderer renderer) {\n        super(renderer);\n        this.x = x; this.y = y; this.radius = r;\n    }\n    public void draw() {\n        new VectorRenderer().renderCircle(x, y, radius);\n    }\n}",
      "options": [
        "if (renderer instanceof VectorRenderer) new VectorRenderer().renderCircle(x, y, radius);",
        "renderer = new RasterRenderer(); renderer.renderCircle(x, y, radius);",
        "renderer.renderCircle(x, y, radius);",
        "Renderer selected = new VectorRenderer(); selected.renderCircle(x, y, radius);"
      ],
      "answer": 2,
      "explanation": "Нужно вызвать renderer.renderCircle(...) у переданного объекта; создание VectorRenderer жёстко закрепляет реализацию.",
      "topic": "Bridge",
      "source": "Прикреплённый квиз 2, вопрос 26",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-2-27",
      "set": "import-2",
      "number": 27,
      "prompt": "In the Builder pattern, what is the main responsibility of a Director?",
      "options": [
        "Define the common construction-step interface for all builders.",
        "Define and reuse the order of construction steps.",
        "Represent the completed object returned by the construction process.",
        "Implement the product-specific details of each construction step."
      ],
      "answer": 1,
      "explanation": "Director задаёт и повторно использует порядок шагов; конкретный Builder реализует сами шаги. Director необязателен.",
      "topic": "Builder",
      "source": "Прикреплённый квиз 2, вопрос 27",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-2-28",
      "set": "import-2",
      "number": 28,
      "prompt": "PrinterAdapter should reuse a supplied LegacyPrinter instance rather than inherit from it. Which design implements an object Adapter?",
      "options": [
        "It stores a LegacyPrinter reference but exposes only printDocument(), leaving the expected Printer contract unimplemented.",
        "It implements the Target interface and stores a reference to an Adaptee.",
        "It implements Printer but copies the legacy printing algorithm into its own print() method without holding an Adaptee.",
        "It extends LegacyPrinter and adds print(), but does not implement the Printer interface expected by the client."
      ],
      "answer": 1,
      "explanation": "Object Adapter реализует Target и хранит Adaptee: это композиция с делегированием.",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 2, вопрос 28",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-2-29",
      "set": "import-2",
      "number": 29,
      "prompt": "A square peg has width 6. Its adapter reports radius = width * sqrt(2) / 2. A RoundHole accepts a peg when holeRadius >= pegRadius. Will the adapted peg fit into a hole of radius 4?",
      "options": [
        "No, because a square peg can never be exposed as a RoundPeg.",
        "No, because the reported radius is approximately 4.24.",
        "Yes, because the width is smaller than the hole diameter.",
        "Yes, because the reported radius is 3."
      ],
      "answer": 1,
      "explanation": "Радиус равен 6 × √2 / 2 ≈ 4.24, что больше 4. Углы квадрата не поместятся.",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 2, вопрос 29",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-2-30",
      "set": "import-2",
      "number": 30,
      "prompt": "In Factory Method, which participant overrides the factory method to choose a concrete product?",
      "options": [
        "Concrete Product.",
        "Concrete Creator.",
        "Creator base class, without relying on any subclass overrides.",
        "Product interface."
      ],
      "answer": 1,
      "explanation": "Concrete Creator переопределяет фабричный метод и выбирает конкретный продукт.",
      "topic": "Factory Method",
      "source": "Прикреплённый квиз 2, вопрос 30",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-2-31",
      "set": "import-2",
      "number": 31,
      "prompt": "getEmployees() returns a List<Employee>. Finding no employees is a normal outcome, and callers iterate over the result. Which return value best follows the lecture guidance?",
      "options": [
        "A List<Employee> containing one null entry to indicate no matching employees.",
        "An empty List<Employee>.",
        "null, with the expectation that every caller must add a no-results null check.",
        "A special Employee with zero pay inside a singleton list, even though no employee matched."
      ],
      "answer": 1,
      "explanation": "Пустой список корректно выражает отсутствие результатов и позволяет безопасно выполнить цикл.",
      "topic": "Clean Code",
      "source": "Прикреплённый квиз 2, вопрос 31",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-2-32",
      "set": "import-2",
      "number": 32,
      "prompt": "What is the main intent of the Bridge pattern?",
      "options": [
        "Separate complex product construction into steps reusable across different representations.",
        "Separate an abstraction from its implementation so both can vary independently.",
        "Separate optional responsibilities into wrappers that preserve one component interface.",
        "Separate an existing client API from a service with an incompatible API by translating requests."
      ],
      "answer": 1,
      "explanation": "Bridge разделяет абстракцию и реализацию на две иерархии, связанные композицией.",
      "topic": "Bridge",
      "source": "Прикреплённый квиз 2, вопрос 32",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-2-33",
      "set": "import-2",
      "number": 33,
      "prompt": "RoadLogistics overrides createTransport() to return a Truck. SeaLogistics overrides it to return a Ship. Their deliver() methods print \"Land\" and \"Sea\", respectively. What happens below, and which change restores subclass-controlled product selection?\n\nabstract class Logistics {\n    abstract Transport createTransport();\n    void planDelivery() {\n        Transport t = new Truck();\n        t.deliver();\n    }\n}\nclass SeaLogistics extends Logistics {\n    Transport createTransport() { return new Ship(); }\n}\n// Truck and Ship implement Transport as stated above.\nLogistics logistics = new SeaLogistics();\nlogistics.planDelivery();",
      "options": [
        "It prints Land; planDelivery() should obtain t by calling createTransport().",
        "It prints Land; changing the client variable type to SeaLogistics makes the inherited method create a Ship.",
        "It prints Sea; dynamic dispatch automatically replaces new Truck() with new Ship().",
        "It prints Sea; createTransport() is called implicitly when planDelivery() starts."
      ],
      "answer": 0,
      "explanation": "Явный new Truck() печатает Land и обходит фабричный метод. Вызов createTransport() вернёт выбор подклассу.",
      "topic": "Factory Method",
      "source": "Прикреплённый квиз 2, вопрос 33",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-2-34",
      "set": "import-2",
      "number": 34,
      "prompt": "The client should be able to call new Car.Builder().setSeats(2).setGPS(true).build(). What should replace the blank in setSeats()?\n\nstatic class Builder {\n    private int seats;\n    public Builder setSeats(int seats) {\n        this.seats = seats;\n        // blank\n    }\n    // setGPS() returns this Builder; build() returns a Car.\n}",
      "options": [
        "this.seats = 0; return this;",
        "return new Builder();",
        "return this;",
        "return new Builder().setSeats(seats);"
      ],
      "answer": 2,
      "explanation": "return this возвращает тот же Builder и сохраняет его настройки для следующего вызова в цепочке.",
      "topic": "Builder",
      "source": "Прикреплённый квиз 2, вопрос 34",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-2-35",
      "set": "import-2",
      "number": 35,
      "prompt": "Each concrete FurnitureFactory creates a matching Chair and Sofa family. The client below unintentionally mixes families. Which change best restores consistent family creation while keeping the client dependent on abstractions?\n\nFurnitureFactory factory = new ModernFurnitureFactory();\nChair chair = factory.createChair();\nSofa sofa = new VictorianFurnitureFactory().createSofa();",
      "options": [
        "Give Chair and Sofa the same variable name prefix while retaining the two factories.",
        "Instantiate a ModernSofa directly in every client that needs a sofa.",
        "Cast both products to their abstract interfaces after creating them from different factories.",
        "Obtain both products from the same supplied FurnitureFactory instance."
      ],
      "answer": 3,
      "explanation": "Одна переданная фабрика создаёт совместимые варианты Chair и Sofa; два разных семейства могут смешаться.",
      "topic": "Abstract Factory",
      "source": "Прикреплённый квиз 2, вопрос 35",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-2-36",
      "set": "import-2",
      "number": 36,
      "prompt": "Checkout expects processPayment(amount), but an unmodifiable vendor library provides charge(total). Which design best allows Checkout to keep its expected interface?",
      "options": [
        "Add a decorator that implements only the vendor API and require Checkout to change its calls.",
        "Subclass Checkout for each vendor and move every vendor-specific call into those client subclasses.",
        "Introduce a factory that returns the vendor object unchanged to a client still expecting processPayment().",
        "Add an Adapter that exposes processPayment() and delegates to charge()."
      ],
      "answer": 3,
      "explanation": "Adapter оставляет клиенту processPayment(), а внутри вызывает charge() внешней библиотеки.",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 2, вопрос 36",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-2-37",
      "set": "import-2",
      "number": 37,
      "prompt": "Which statement best describes a software design pattern?",
      "options": [
        "A reusable design blueprint that must be adapted to a particular problem.",
        "A reusable specification of business requirements rather than an approach to software design.",
        "A reusable class hierarchy that solves any problem once its class names are changed.",
        "A reusable algorithm whose implementation must remain identical in every application."
      ],
      "answer": 0,
      "explanation": "Паттерн — адаптируемая схема решения повторяющейся задачи проектирования, а не готовый неизменяемый код.",
      "topic": "Design Patterns",
      "source": "Прикреплённый квиз 2, вопрос 37",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-2-38",
      "set": "import-2",
      "number": 38,
      "prompt": "Shape stores a Renderer reference. Circle extends Shape. VectorRenderer implements Renderer. Which participant is Circle?",
      "options": [
        "Refined Abstraction.",
        "Implementor.",
        "Adapter.",
        "Concrete Implementation."
      ],
      "answer": 0,
      "explanation": "Circle уточняет абстракцию Shape, поэтому это Refined Abstraction. Renderer задаёт интерфейс реализации.",
      "topic": "Bridge",
      "source": "Прикреплённый квиз 2, вопрос 38",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-2-39",
      "set": "import-2",
      "number": 39,
      "prompt": "Customers can add milk, sugar, or both to an individual coffee order at runtime. You want reusable add-on layers without a subclass for every combination. Which pattern best fits?",
      "options": [
        "Bridge, treating the coffee and each optional add-on layer as separate dimensions rather than a wrapper stack.",
        "Abstract Factory, with a different product family for every possible add-on combination.",
        "Builder, with each add-on permanently configured only during product construction.",
        "Decorator."
      ],
      "answer": 3,
      "explanation": "Decorator добавляет независимые слои поведения конкретному объекту во время работы.",
      "topic": "Decorator",
      "source": "Прикреплённый квиз 2, вопрос 39",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-2-40",
      "set": "import-2",
      "number": 40,
      "prompt": "Project A integrates a legacy printer whose methods do not match the existing client API. Project B is designed to support independent changes to document types and rendering backends. Which pair best matches the primary problems?",
      "options": [
        "A: Bridge; B: Adapter.",
        "A: Adapter; B: Decorator.",
        "A: Adapter; B: Bridge.",
        "A: Decorator; B: Bridge."
      ],
      "answer": 2,
      "explanation": "Adapter исправляет несовместимость существующих интерфейсов; Bridge разделяет независимые направления изменения.",
      "topic": "Adapter",
      "source": "Прикреплённый квиз 2, вопрос 40",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-3-1",
      "set": "import-3",
      "number": 1,
      "prompt": "A long-lived subject keeps strong references to its observers in an ArrayList. A closed display is no longer needed, but remains registered. Why should it normally be unregistered?",
      "options": [
        "The subject can keep the display reachable and continue sending it unwanted updates.",
        "An interface reference cannot keep an object reachable.",
        "Closing the display automatically clears the entire observer list.",
        "Java automatically removes observers after their first notification."
      ],
      "answer": 0,
      "explanation": "Ссылка в списке удерживает display достижимым и продолжает доставлять ему события. Отписка убирает эту связь.",
      "topic": "Observer",
      "source": "Прикреплённый квиз 3, вопрос 1",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-3-2",
      "set": "import-3",
      "number": 2,
      "prompt": "EventManager notifies only listeners registered for the supplied event type. Each matching listener is called once. logger prints LOG and mailer prints EMAIL. What is printed?\n\nevents.subscribe(\"open\", logger);\nevents.subscribe(\"save\", mailer);\nevents.notify(\"open\", file);\nevents.notify(\"save\", file);",
      "options": [
        "LOG\nEMAIL",
        "EMAIL\nEMAIL",
        "EMAIL\nLOG",
        "LOG\nEMAIL\nLOG\nEMAIL"
      ],
      "answer": 0,
      "explanation": "Событие open вызывает logger → LOG, затем save вызывает mailer → EMAIL.",
      "topic": "Observer",
      "source": "Прикреплённый квиз 3, вопрос 2",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-3-3",
      "set": "import-3",
      "number": 3,
      "prompt": "Each setWeather call notifies all currently registered observers once. Registration does not trigger an update. Initially no observers are registered. How many update calls does each display receive?\n\nstation.addObserver(phone);\nstation.addObserver(tv);\nstation.setWeather(\"Sunny\");\nstation.removeObserver(tv);\nstation.setWeather(\"Rainy\");",
      "options": [
        "phone: 1; tv: 1",
        "phone: 2; tv: 2",
        "phone: 2; tv: 1",
        "phone: 1; tv: 2"
      ],
      "answer": 2,
      "explanation": "Sunny получают оба. После удаления tv только phone получает Rainy: 2 и 1 вызов.",
      "topic": "Observer",
      "source": "Прикреплённый квиз 3, вопрос 3",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-3-4",
      "set": "import-3",
      "number": 4,
      "prompt": "Customers repeatedly check a store's website to see whether a product is available. Which Observer-based change addresses this problem?",
      "options": [
        "Notify every customer about every product, regardless of interest.",
        "Let interested customers subscribe and notify them when the product becomes available.",
        "Create a separate store implementation for each customer.",
        "Make every customer check the website more frequently."
      ],
      "answer": 1,
      "explanation": "Заинтересованные клиенты подписываются и получают событие о наличии товара вместо постоянных проверок.",
      "topic": "Observer",
      "source": "Прикреплённый квиз 3, вопрос 4",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-3-5",
      "set": "import-3",
      "number": 5,
      "prompt": "Which keyword completes the Java class declaration?\n\ninterface Observer {\n    void update(String weather);\n}\nclass PhoneDisplay ____ Observer {\n    public void update(String weather) {\n        System.out.println(weather);\n    }\n}",
      "options": [
        "instanceof",
        "extends",
        "implements",
        "new"
      ],
      "answer": 2,
      "explanation": "Класс реализует интерфейс через implements; extends используется для наследования класса.",
      "topic": "Observer",
      "source": "Прикреплённый квиз 3, вопрос 5",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-3-6",
      "set": "import-3",
      "number": 6,
      "prompt": "One dashboard implements the notification interface required by two separate weather stations. Can the same dashboard object observe both?",
      "options": [
        "Yes, if it is registered with both stations.",
        "No, both stations must first inherit from the dashboard class.",
        "No, one observer object can be registered with only one subject.",
        "Yes, but registering with one automatically registers it with the other."
      ],
      "answer": 0,
      "explanation": "Один объект может наблюдать за несколькими источниками, но должен отдельно подписаться на каждый.",
      "topic": "Observer",
      "source": "Прикреплённый квиз 3, вопрос 6",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-3-7",
      "set": "import-3",
      "number": 7,
      "prompt": "Which set of responsibilities belongs to the subject in a typical Observer implementation?",
      "options": [
        "Choose the concrete class of every possible observer.",
        "Store all observers' private internal state.",
        "Maintain subscriptions and notify registered observers.",
        "Define the screen layout used by every observer."
      ],
      "answer": 2,
      "explanation": "Subject хранит подписки, добавляет и удаляет их, затем уведомляет зарегистрированные объекты.",
      "topic": "Observer",
      "source": "Прикреплённый квиз 3, вопрос 7",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-3-8",
      "set": "import-3",
      "number": 8,
      "prompt": "Which requirement is the strongest reason to use Observer?",
      "options": [
        "A class needs to hide one private calculation from its callers.",
        "A utility method must add two numbers and return their sum.",
        "Several independent components must react when the same object changes state.",
        "A program must create a single immutable configuration value."
      ],
      "answer": 2,
      "explanation": "Observer подходит, когда несколько независимых компонентов реагируют на изменение одного источника.",
      "topic": "Observer",
      "source": "Прикреплённый квиз 3, вопрос 8",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-3-9",
      "set": "import-3",
      "number": 9,
      "prompt": "A subject starts with no observers. addObserver only registers; removeObserver removes that subscription. Each setValue call updates every currently registered observer once. Observer A sums received values, starting at 0. Observer B counts updates, starting at 0. What are their final results?\n\nsubject.addObserver(a);\nsubject.setValue(1);\nsubject.addObserver(b);\nsubject.setValue(2);\nsubject.removeObserver(a);\nsubject.setValue(4);\nsubject.addObserver(a);\nsubject.setValue(7);",
      "options": [
        "A sum: 6; B count: 4",
        "A sum: 14; B count: 3",
        "A sum: 10; B count: 3",
        "A sum: 10; B count: 2"
      ],
      "answer": 2,
      "explanation": "A получает 1, 2 и 7: сумма 10. B получает 2, 4 и 7: три уведомления.",
      "topic": "Observer",
      "source": "Прикреплённый квиз 3, вопрос 9",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-3-10",
      "set": "import-3",
      "number": 10,
      "prompt": "The list below is an ArrayList, so it allows duplicate references. remove(Object) removes one matching occurrence. phone.update increments a counter initially equal to 0. What is its final value?\n\nList<Observer> observers = new ArrayList<>();\nobservers.add(phone);\nobservers.add(phone);\nfor (Observer o : observers) {\n    o.update(\"Sunny\");\n}\nobservers.remove(phone);\nfor (Observer o : observers) {\n    o.update(\"Rainy\");\n}",
      "options": [
        "1",
        "4",
        "2",
        "3"
      ],
      "answer": 3,
      "explanation": "Первый цикл вызывает phone дважды. После удаления одной записи второй вызывает его ещё раз: всего 3.",
      "topic": "Observer",
      "source": "Прикреплённый квиз 3, вопрос 10",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-3-11",
      "set": "import-3",
      "number": 11,
      "prompt": "notifyObservers() sends the current value of the weather field to all observers. Which replacement ensures observers receive newWeather?\n\nprivate String weather = \"Sunny\";\n\npublic void setWeather(String newWeather) {\n    ____\n}",
      "options": [
        "notifyObservers();\nthis.weather = newWeather;",
        "this.weather = newWeather;",
        "newWeather = this.weather;\nnotifyObservers();",
        "this.weather = newWeather;\nnotifyObservers();"
      ],
      "answer": 3,
      "explanation": "Сначала нужно записать newWeather в поле, затем уведомить, чтобы отправить новое состояние.",
      "topic": "Observer",
      "source": "Прикреплённый квиз 3, вопрос 11",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-3-12",
      "set": "import-3",
      "number": 12,
      "prompt": "WeatherData stores temperature, humidity, and pressure. PhoneDisplay and TVDisplay react to new measurements. Which assignment of roles is correct?",
      "options": [
        "All three objects are subjects, with no observers.",
        "The displays are subjects; temperature and humidity are observers.",
        "WeatherData is the subject; PhoneDisplay and TVDisplay are observers.",
        "WeatherData is an observer; both displays are subjects."
      ],
      "answer": 2,
      "explanation": "WeatherData хранит наблюдаемое состояние; PhoneDisplay и TVDisplay получают события как observers.",
      "topic": "Observer",
      "source": "Прикреплённый квиз 3, вопрос 12",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-3-13",
      "set": "import-3",
      "number": 13,
      "prompt": "A station starts with no observers. addObserver only stores the observer; it does not replay earlier weather. Each setWeather call notifies current observers. Display.update prints the weather. What does display print?\n\nstation.setWeather(\"Sunny\");\nstation.addObserver(display);\nstation.setWeather(\"Rainy\");",
      "options": [
        "Nothing is printed.",
        "Sunny",
        "Sunny\nRainy",
        "Rainy"
      ],
      "answer": 3,
      "explanation": "display подписан после Sunny; прошлые события не повторяются автоматически, поэтому печатается только Rainy.",
      "topic": "Observer",
      "source": "Прикреплённый квиз 3, вопрос 13",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-3-14",
      "set": "import-3",
      "number": 14,
      "prompt": "Observer declares void update(String weather). Which statement correctly notifies the current observer?\n\nprivate List<Observer> observers = new ArrayList<>();\nprivate String weather;\n\npublic void notifyObservers() {\n    for (Observer observer : observers) {\n        ____\n    }\n}",
      "options": [
        "observer = new PhoneDisplay();",
        "observers.update(weather);",
        "observer.update();",
        "observer.update(weather);"
      ],
      "answer": 3,
      "explanation": "observer — текущий элемент списка; observer.update(weather) передаёт ему новое значение.",
      "topic": "Observer",
      "source": "Прикреплённый квиз 3, вопрос 14",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-3-15",
      "set": "import-3",
      "number": 15,
      "prompt": "In this Editor, file initially equals null. A save listener prints EMAIL whenever it is notified. What does the client code print?\n\npublic void saveFile() throws Exception {\n    if (file == null) {\n        throw new Exception(\"Open a file first\");\n    }\n    events.notify(\"save\", file);\n}\n\n// Client code (no file has been opened):\ntry {\n    editor.saveFile();\n} catch (Exception e) {\n    System.out.println(\"ERROR\");\n}",
      "options": [
        "EMAIL\nERROR",
        "EMAIL",
        "ERROR\nEMAIL",
        "ERROR"
      ],
      "answer": 3,
      "explanation": "При file == null исключение возникает до notify(), поэтому печатается только ERROR.",
      "topic": "Observer",
      "source": "Прикреплённый квиз 3, вопрос 15",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-3-16",
      "set": "import-3",
      "number": 16,
      "prompt": "Assume the imports and Observer interface are available. What happens when this code runs?\n\nList<Observer> observers = new ArrayList<>();\nfor (Observer o : observers) {\n    o.update(\"Sunny\");\n}",
      "options": [
        "Every Observer object in the program receives the update.",
        "An exception is thrown because the list is empty.",
        "One observer is automatically created and updated.",
        "The loop body runs zero times and no observer is updated."
      ],
      "answer": 3,
      "explanation": "Пустой список содержит ноль элементов: тело цикла не выполняется. Пустой список не равен null.",
      "topic": "Observer",
      "source": "Прикреплённый квиз 3, вопрос 16",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-3-17",
      "set": "import-3",
      "number": 17,
      "prompt": "Assume o is registered exactly once. Which statement removes o while preserving all other subscriptions?\n\nprivate List<Observer> observers = new ArrayList<>();\n\npublic void removeObserver(Observer o) {\n    ____\n}",
      "options": [
        "o = null;",
        "observers.add(o);",
        "observers.clear();",
        "observers.remove(o);"
      ],
      "answer": 3,
      "explanation": "observers.remove(o) удаляет нужную запись. Присвоение o = null меняет лишь локальный параметр.",
      "topic": "Observer",
      "source": "Прикреплённый квиз 3, вопрос 17",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-3-18",
      "set": "import-3",
      "number": 18,
      "prompt": "Both objects implement TemperatureObserver, whose method is void update(int temperature). A subject calls both update methods with 20 and then with 30. latest.value and total.value initially equal 0. What does the last line print?\n\n// Inside LatestDisplay:\npublic void update(int temperature) {\n    value = temperature;\n}\n\n// Inside TotalDisplay:\npublic void update(int temperature) {\n    value += temperature;\n}\n\n// After both notifications:\nSystem.out.println(latest.value + \" \" + total.value);",
      "options": [
        "20 50",
        "30 30",
        "30 50",
        "50 50"
      ],
      "answer": 2,
      "explanation": "LatestDisplay сохраняет последнее значение 30, TotalDisplay суммирует 20 + 30 = 50.",
      "topic": "Observer",
      "source": "Прикреплённый квиз 3, вопрос 18",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-3-19",
      "set": "import-3",
      "number": 19,
      "prompt": "Which category does the Observer design pattern belong to?",
      "options": [
        "Creational",
        "Structural",
        "Architectural layering",
        "Behavioral"
      ],
      "answer": 3,
      "explanation": "Observer — поведенческий паттерн, организующий сообщения и реакции объектов.",
      "topic": "Observer",
      "source": "Прикреплённый квиз 3, вопрос 19",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-3-20",
      "set": "import-3",
      "number": 20,
      "prompt": "Exactly one observer is registered. notifyObservers() immediately prints the current weather through that observer. What is printed by the two client calls?\n\nprivate String weather = \"Sunny\";\n\npublic void setWeather(String newWeather) {\n    notifyObservers();\n    this.weather = newWeather;\n}\n\n// Client code:\nstation.setWeather(\"Rainy\");\nstation.setWeather(\"Windy\");",
      "options": [
        "Sunny\nSunny",
        "Rainy\nWindy",
        "Windy\nWindy",
        "Sunny\nRainy"
      ],
      "answer": 3,
      "explanation": "Уведомление идёт до изменения поля: сначала Sunny, затем Rainy. Windy только сохраняется после второго уведомления.",
      "topic": "Observer",
      "source": "Прикреплённый квиз 3, вопрос 20",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-3-21",
      "set": "import-3",
      "number": 21,
      "prompt": "A subject calls each observer's update() directly, one after another, on the same thread. One observer takes several seconds. What is the likely effect?",
      "options": [
        "Java automatically runs the slow observer on a new thread.",
        "The subject automatically skips all later observers permanently.",
        "The slow observer is automatically removed from the list.",
        "Later callbacks and completion of the notification method are delayed."
      ],
      "answer": 3,
      "explanation": "Синхронный вызов блокирует текущий поток до завершения: последующие подписчики ждут.",
      "topic": "Observer",
      "source": "Прикреплённый квиз 3, вопрос 21",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-3-22",
      "set": "import-3",
      "number": 22,
      "prompt": "A new object implements Observer. What normally makes it start receiving notifications from an existing subject?",
      "options": [
        "Giving the object a variable name ending in Display.",
        "Registering the object with that subject.",
        "Declaring the Observer interface in the same package.",
        "Creating any other observer of the same class."
      ],
      "answer": 1,
      "explanation": "Реализация интерфейса ещё не создаёт подписку; объект нужно зарегистрировать у источника.",
      "topic": "Observer",
      "source": "Прикреплённый квиз 3, вопрос 22",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-3-23",
      "set": "import-3",
      "number": 23,
      "prompt": "EventManager keeps a separate listener list for each event type. unsubscribe removes a listener only from the specified list. Which events does listener receive after the unsubscription shown?\n\nevents.subscribe(\"open\", listener);\nevents.subscribe(\"save\", listener);\nevents.unsubscribe(\"open\", listener);\nevents.notify(\"open\", file);\nevents.notify(\"save\", file);",
      "options": [
        "Neither event.",
        "Only \"save\".",
        "Both \"open\" and \"save\".",
        "Only \"open\"."
      ],
      "answer": 1,
      "explanation": "Подписки open и save независимы. После удаления open остаётся только save.",
      "topic": "Observer",
      "source": "Прикреплённый квиз 3, вопрос 23",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-3-24",
      "set": "import-3",
      "number": 24,
      "prompt": "An observer must run before another observer for the application to work correctly. What can you conclude from the Observer pattern alone?",
      "options": [
        "The required order must be explicitly provided by the implementation or design.",
        "Observers always run in reverse registration order.",
        "Observers always run simultaneously on separate threads.",
        "Observers always run alphabetically by class name."
      ],
      "answer": 0,
      "explanation": "Сам Observer не гарантирует порядок. Нужную последовательность должна явно задавать реализация.",
      "topic": "Observer",
      "source": "Прикреплённый квиз 3, вопрос 24",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-3-25",
      "set": "import-3",
      "number": 25,
      "prompt": "The following method should register o without removing existing subscriptions. Which statement replaces the blank?\n\nprivate List<Observer> observers = new ArrayList<>();\n\npublic void addObserver(Observer o) {\n    ____\n}",
      "options": [
        "observers.add(o);",
        "observers.clear();",
        "observers.remove(o);",
        "o.update(\"Registered\");"
      ],
      "answer": 0,
      "explanation": "observers.add(o) сохраняет подписку и оставляет все существующие записи.",
      "topic": "Observer",
      "source": "Прикреплённый квиз 3, вопрос 25",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-3-26",
      "set": "import-3",
      "number": 26,
      "prompt": "PhoneDisplay and TVDisplay both implement Observer. Which declaration lets a subject store both types and call update() without casts? Assume the java.util imports are present.\n\ninterface Observer {\n    void update(String weather);\n}",
      "options": [
        "List<String> observers = new ArrayList<>();",
        "List<Object> observers = new ArrayList<>();",
        "List<Observer> observers = new ArrayList<>();",
        "List<PhoneDisplay> observers = new ArrayList<>();"
      ],
      "answer": 2,
      "explanation": "List<Observer> хранит разные реализации общего интерфейса и позволяет вызывать update() без приведения типов.",
      "topic": "Observer",
      "source": "Прикреплённый квиз 3, вопрос 26",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-3-27",
      "set": "import-3",
      "number": 27,
      "prompt": "A weather station already notifies a List<Observer>. You want to add a smartwatch display without changing the notification code. Which approach best supports the Open/Closed Principle?",
      "options": [
        "Add a smartwatch-specific update method to every existing display.",
        "Copy the station class and hard-code only the smartwatch in the copy.",
        "Add an instanceof branch for SmartwatchDisplay inside the station.",
        "Implement Observer in SmartwatchDisplay and register an instance."
      ],
      "answer": 3,
      "explanation": "Новый SmartwatchDisplay реализует Observer и подписывается; код существующего издателя менять не требуется.",
      "topic": "Observer",
      "source": "Прикреплённый квиз 3, вопрос 27",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-3-28",
      "set": "import-3",
      "number": 28,
      "prompt": "EventManager starts with empty lists for \"open\" and \"save\". It delivers each event once to every listener in that event's list. unsubscribe affects only the named event. How many calls does each listener receive?\n\nevents.subscribe(\"open\", logger);\nevents.subscribe(\"save\", logger);\nevents.subscribe(\"save\", mailer);\nevents.notify(\"open\", file);\nevents.notify(\"save\", file);\nevents.unsubscribe(\"save\", logger);\nevents.notify(\"save\", file);",
      "options": [
        "logger: 1; mailer: 3",
        "logger: 2; mailer: 1",
        "logger: 2; mailer: 2",
        "logger: 3; mailer: 2"
      ],
      "answer": 2,
      "explanation": "logger получает open и первый save. mailer получает оба save. У каждого по 2 вызова.",
      "topic": "Observer",
      "source": "Прикреплённый квиз 3, вопрос 28",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-3-29",
      "set": "import-3",
      "number": 29,
      "prompt": "Three different observers are registered. Their update methods return normally and do not change the list. Which change makes this method notify all three?\n\npublic void notifyObservers() {\n    for (Observer observer : observers) {\n        observer.update(weather);\n        break;\n    }\n}",
      "options": [
        "Remove the break statement.",
        "Clear observers immediately before the loop.",
        "Replace break with return.",
        "Move break before observer.update(weather)."
      ],
      "answer": 0,
      "explanation": "break завершает цикл после первого элемента. Без него вызов получат все три подписчика.",
      "topic": "Observer",
      "source": "Прикреплённый квиз 3, вопрос 29",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-3-30",
      "set": "import-3",
      "number": 30,
      "prompt": "Why do PhoneDisplay, TVDisplay, and other observers implement a common Observer interface?",
      "options": [
        "The interface automatically registers every created observer.",
        "The subject can call the same notification method on different observer types.",
        "Every observer must produce exactly the same output.",
        "The subject must inherit from each observer class."
      ],
      "answer": 1,
      "explanation": "Общий интерфейс даёт единый метод update(), хотя реакции конкретных подписчиков могут различаться.",
      "topic": "Observer",
      "source": "Прикреплённый квиз 3, вопрос 30",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-3-31",
      "set": "import-3",
      "number": 31,
      "prompt": "What is the main purpose of the Observer pattern?",
      "options": [
        "Create objects without specifying their concrete classes.",
        "Notify registered dependent objects when a subject changes.",
        "Translate one interface into a different interface.",
        "Provide a simpler entry point to a complex subsystem."
      ],
      "answer": 1,
      "explanation": "Observer уведомляет подписанные зависимые объекты об изменениях источника: связь «один ко многим».",
      "topic": "Observer",
      "source": "Прикреплённый квиз 3, вопрос 31",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-3-32",
      "set": "import-3",
      "number": 32,
      "prompt": "What does loose coupling mean in the lecture's Observer design?",
      "options": [
        "Observers and the subject are forbidden to call methods.",
        "The subject uses the Observer interface without depending on each concrete observer class.",
        "Every observer must be implemented inside the subject class.",
        "The subject holds no references to any observer objects."
      ],
      "answer": 1,
      "explanation": "Subject знает контракт Observer, но не детали каждого конкретного подписчика. Ссылки на observers при этом сохраняются.",
      "topic": "Observer",
      "source": "Прикреплённый квиз 3, вопрос 32",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-3-33",
      "set": "import-3",
      "number": 33,
      "prompt": "WeatherStation notifies only registered observers. PhoneDisplay does not register itself in its constructor. Which line should replace the blank so phone receives \"Rainy\"?\n\nWeatherStation station = new WeatherStation();\nObserver phone = new PhoneDisplay();\n____\nstation.setWeather(\"Rainy\");",
      "options": [
        "station.removeObserver(phone);",
        "station.addObserver(phone);",
        "station = new WeatherStation();",
        "phone = new PhoneDisplay();"
      ],
      "answer": 1,
      "explanation": "Нужно зарегистрировать именно phone именно у station до события Rainy.",
      "topic": "Observer",
      "source": "Прикреплённый квиз 3, вопрос 33",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-3-34",
      "set": "import-3",
      "number": 34,
      "prompt": "Observers are correctly registered, but displays do not react when this method runs. There is no other notification code. Which change fixes the problem?\n\npublic void setWeather(String newWeather) {\n    this.weather = newWeather;\n}",
      "options": [
        "Rename newWeather to update and keep the method body unchanged.",
        "Remove every observer before assigning newWeather.",
        "Call notifyObservers() after assigning newWeather to weather.",
        "Make weather public and keep the method body unchanged."
      ],
      "answer": 2,
      "explanation": "Присвоение полю само по себе не уведомляет подписчиков: после него нужен notifyObservers().",
      "topic": "Observer",
      "source": "Прикреплённый квиз 3, вопрос 34",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-3-35",
      "set": "import-3",
      "number": 35,
      "prompt": "In the lecture's text editor example, Editor contains an EventManager. What is the main purpose of this helper object?",
      "options": [
        "Replace the file state and all business logic inside Editor.",
        "Implement the email-sending behavior of every listener.",
        "Manage listener subscriptions and deliver notifications for event types.",
        "Force Editor to inherit from each concrete listener class."
      ],
      "answer": 2,
      "explanation": "EventManager управляет подписками и доставкой событий; Editor продолжает выполнять работу с файлами.",
      "topic": "Observer",
      "source": "Прикреплённый квиз 3, вопрос 35",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-3-36",
      "set": "import-3",
      "number": 36,
      "prompt": "Which method declaration correctly implements the interface method shown?\n\ninterface Observer {\n    void update(String weather);\n}",
      "options": [
        "public String update(String weather)",
        "public void update()",
        "private void update(String weather)",
        "public void update(String weather)"
      ],
      "answer": 3,
      "explanation": "Нужны те же параметры и void; реализация публичного метода интерфейса тоже должна быть public.",
      "topic": "Observer",
      "source": "Прикреплённый квиз 3, вопрос 36",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-3-37",
      "set": "import-3",
      "number": 37,
      "prompt": "A subject sends three temperatures, in order: 25, 30, and 35. It calls this observer's update method once for each temperature. What does the observer print?\n\ninterface TemperatureObserver {\n    void update(int temperature);\n}\nclass HeatAlert implements TemperatureObserver {\n    public void update(int temperature) {\n        if (temperature >= 30) {\n            System.out.println(\"HOT\");\n        }\n    }\n}",
      "options": [
        "Nothing is printed.",
        "HOT",
        "HOT\nHOT\nHOT",
        "HOT\nHOT"
      ],
      "answer": 3,
      "explanation": "Все три уведомления получены, но условие >= 30 выполнено для 30 и 35: две строки HOT.",
      "topic": "Observer",
      "source": "Прикреплённый квиз 3, вопрос 37",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-3-38",
      "set": "import-3",
      "number": 38,
      "prompt": "One observer is registered once. notifyObservers() calls its update() once. Starting from zero, how many updates occur after the two calls shown?\n\npublic void setWeather(String newWeather) {\n    this.weather = newWeather;\n    notifyObservers();\n}\n\n// Client code:\nstation.setWeather(\"Sunny\");\nstation.setWeather(\"Sunny\");",
      "options": [
        "1",
        "2",
        "4",
        "0"
      ],
      "answer": 1,
      "explanation": "Этот setter уведомляет при каждом вызове, даже если значение повторяется: всего 2 обновления.",
      "topic": "Observer",
      "source": "Прикреплённый квиз 3, вопрос 38",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-3-39",
      "set": "import-3",
      "number": 39,
      "prompt": "The map contains separate initialized lists for \"open\" and \"save\". Each listener implements update(String eventType, File file). The method incorrectly selects the open listeners for every event. Which replacement for the marked line fixes event routing?\n\nMap<String, List<EventListener>> listeners;\n\npublic void notify(String eventType, File file) {\n    List<EventListener> targets = listeners.get(\"open\"); // replace\n    for (EventListener listener : targets) {\n        listener.update(eventType, file);\n    }\n}",
      "options": [
        "List<EventListener> targets = listeners.get(eventType);",
        "List<EventListener> targets = listeners.get(\"save\");",
        "List<EventListener> targets = new ArrayList<>();",
        "List<EventListener> targets = listeners.get(file.getName());"
      ],
      "answer": 0,
      "explanation": "Нужно выбирать список по переданному eventType, а не всегда по фиксированному ключу open.",
      "topic": "Observer",
      "source": "Прикреплённый квиз 3, вопрос 39",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-3-40",
      "set": "import-3",
      "number": 40,
      "prompt": "A display has one subscription to a weather station. The station removes that subscription before the next notification. What is the expected result?",
      "options": [
        "The display object is immediately destroyed.",
        "The display stops receiving future notifications from that station.",
        "The station can no longer change its weather data.",
        "Every display is automatically unsubscribed."
      ],
      "answer": 1,
      "explanation": "Отписка прекращает будущие уведомления от этой станции, но не уничтожает объект display.",
      "topic": "Observer",
      "source": "Прикреплённый квиз 3, вопрос 40",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-4-1",
      "set": "import-4",
      "number": 1,
      "prompt": "A deployment tool offers deployApplication() to coordinate packaging, uploading and service startup. Which responsibility belongs to this facade?",
      "options": [
        "Choose one subsystem object and discard the remaining deployment steps.",
        "Translate the high-level deployment request into the necessary calls to the subsystem objects.",
        "Replace the implementation of every packaging, uploading and startup class.",
        "Require each subsystem to call the facade before performing its own internal work."
      ],
      "answer": 1,
      "explanation": "Facade переводит удобный запрос deployApplication() в последовательность вызовов подсистем; их работу выполняют сами компоненты.",
      "topic": "Facade",
      "source": "Прикреплённый квиз 4, вопрос 1",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-4-2",
      "set": "import-4",
      "number": 2,
      "prompt": "An ImageFacade provides a simple makeThumbnail() operation. A specialist tool also needs direct access to a public filter API in the underlying library. What does the Facade pattern itself imply about that direct access?",
      "options": [
        "Direct access can remain available; the facade does not inherently forbid using public subsystem APIs.",
        "Direct access must be removed because every subsystem method becomes private when a facade is introduced.",
        "The specialist tool must inherit from ImageFacade before it can use any filter API.",
        "The facade must copy the filter implementation into the specialist tool."
      ],
      "answer": 0,
      "explanation": "Facade упрощает обычный сценарий, но сам по себе не запрещает прямой доступ к публичным API подсистем.",
      "topic": "Facade",
      "source": "Прикреплённый квиз 4, вопрос 2",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-4-3",
      "set": "import-4",
      "number": 3,
      "prompt": "TextFacade should read the contents of the named file, normalize those contents, and return the normalized result. All listed calls accept and return String values. Which line correctly completes loadCleanText()?\n\ninterface TextReader { String read(String filename); }\ninterface Normalizer { String normalize(String contents); }\nclass TextFacade {\n    private final TextReader reader;\n    private final Normalizer normalizer;\n    TextFacade(TextReader reader, Normalizer normalizer) {\n        this.reader = reader;\n        this.normalizer = normalizer;\n    }\n    String loadCleanText(String file) {\n        // ________\n    }\n}",
      "options": [
        "return normalizer.normalize(reader.read(file));",
        "return normalizer.normalize(file);",
        "return reader.read(file);",
        "return reader.read(normalizer.normalize(file));"
      ],
      "answer": 0,
      "explanation": "Сначала reader.read(file) получает содержимое; затем normalizer.normalize(...) обрабатывает именно это содержимое.",
      "topic": "Facade",
      "source": "Прикреплённый квиз 4, вопрос 3",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-4-4",
      "set": "import-4",
      "number": 4,
      "prompt": "A wrapper exposes two convenient operations over a single large legacy class with dozens of methods. It simplifies a common workflow and does not translate an interface required by an existing client. Can its intent still be Facade?",
      "options": [
        "Yes; any wrapper is a Facade, even if it only changes an incompatible interface.",
        "Yes; simplifying access is the relevant intent, even when only one underlying class is wrapped.",
        "No; Facade requires at least two underlying classes, regardless of its purpose.",
        "No; any wrapper around one class is automatically an Adapter."
      ],
      "answer": 1,
      "explanation": "Определяющая цель Facade — упрощение доступа. Для этого достаточно даже одного сложного класса.",
      "topic": "Facade",
      "source": "Прикреплённый квиз 4, вопрос 4",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-4-5",
      "set": "import-4",
      "number": 5,
      "prompt": "Within Controller.process(Document doc), printer is a direct field of Controller. Assume all shown methods exist. Which call most clearly violates the Principle of Least Knowledge by navigating through objects obtained from other objects?",
      "options": [
        "printer.print(doc);",
        "doc.getOwner().getAccount().close();",
        "doc.validate();",
        "new Preview().show(doc);"
      ],
      "answer": 1,
      "explanation": "Цепочка doc → owner → account заставляет Controller знать удалённые внутренние связи объектов.",
      "topic": "Facade",
      "source": "Прикреплённый квиз 4, вопрос 5",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-4-6",
      "set": "import-4",
      "number": 6,
      "prompt": "A proposed booking facade exposes nearly every low-level method from the hotel library. Clients still need to know the correct sequence for checking availability, reserving a room and taking payment. Which change would better achieve the main intent of Facade?",
      "options": [
        "Return the raw service objects so every client can reconstruct the workflow.",
        "Rename each low-level method while preserving the same client-managed sequence.",
        "Combine the low-level methods into one interface but leave every workflow decision to clients.",
        "Offer a bookRoom() operation that coordinates the common workflow through the existing services."
      ],
      "answer": 3,
      "explanation": "bookRoom() скрывает порядок проверки, бронирования и оплаты за одной понятной операцией.",
      "topic": "Facade",
      "source": "Прикреплённый квиз 4, вопрос 6",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-4-7",
      "set": "import-4",
      "number": 7,
      "prompt": "DownloadService stores a CompressionStrategy reference and delegates compress(data) to it. ZipCompression and GzipCompression implement that interface. In this design, which participant is the Context?",
      "options": [
        "ZipCompression.",
        "GzipCompression.",
        "DownloadService.",
        "CompressionStrategy."
      ],
      "answer": 2,
      "explanation": "DownloadService хранит ссылку на стратегию и делегирует ей алгоритм — это Context.",
      "topic": "Strategy",
      "source": "Прикреплённый квиз 4, вопрос 7",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-4-8",
      "set": "import-4",
      "number": 8,
      "prompt": "RoutePlanner.use() should replace the current strategy with the argument supplied by its caller. Which line correctly completes the setter?\n\ninterface Route { int minutes(); }\nclass Walking implements Route {\n    public int minutes() { return 25; }\n}\nclass RoutePlanner {\n    private Route route;\n    RoutePlanner(Route route) { this.route = route; }\n    void use(Route route) {\n        // ________\n    }\n    int estimate() { return route.minutes(); }\n}",
      "options": [
        "route = this.route;",
        "route = route;",
        "this.route = route;",
        "this.route = new Walking();"
      ],
      "answer": 2,
      "explanation": "this.route обозначает поле объекта; route — аргумент. this.route = route сохраняет переданную стратегию.",
      "topic": "Strategy",
      "source": "Прикреплённый квиз 4, вопрос 8",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-4-9",
      "set": "import-4",
      "number": 9,
      "prompt": "Both checkouts initially reference the same stateless StandardFee object. What is printed after only checkout a receives a different strategy?\n\ninterface Fee { int charge(int base); }\nclass StandardFee implements Fee {\n    public int charge(int base) { return base + 10; }\n}\nclass NoFee implements Fee {\n    public int charge(int base) { return base; }\n}\nclass Checkout {\n    private Fee fee;\n    Checkout(Fee fee) { this.fee = fee; }\n    void setFee(Fee fee) { this.fee = fee; }\n    int total(int base) { return fee.charge(base); }\n}\n// Statements inside main:\nFee shared = new StandardFee();\nCheckout a = new Checkout(shared);\nCheckout b = new Checkout(shared);\na.setFee(new NoFee());\nSystem.out.println(a.total(50) + \":\" + b.total(50));",
      "options": [
        "60:60",
        "50:50",
        "60:50",
        "50:60"
      ],
      "answer": 3,
      "explanation": "У каждого Checkout своя ссылка. Только a переключается на NoFee: 50; b остаётся на StandardFee: 60.",
      "topic": "Strategy",
      "source": "Прикреплённый квиз 4, вопрос 9",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-4-10",
      "set": "import-4",
      "number": 10,
      "prompt": "A delivery-cost strategy needs package weight and distance to calculate a price. The context already has both values. Which interface design most directly supplies the needed data while keeping the strategy independent of unrelated context details?",
      "options": [
        "Declare cost(weight, distance) and pass the values when the context delegates.",
        "Make every field of the context public so the strategy can inspect anything it chooses.",
        "Require every delivery strategy to inherit from the entire checkout context.",
        "Copy the checkout workflow into every strategy so each can obtain the values itself."
      ],
      "answer": 0,
      "explanation": "Передать weight и distance параметрами достаточно; стратегии не нужен доступ ко всему состоянию Context.",
      "topic": "Strategy",
      "source": "Прикреплённый квиз 4, вопрос 10",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-4-11",
      "set": "import-4",
      "number": 11,
      "prompt": "Which situation provides the weakest reason to introduce Strategy?",
      "options": [
        "A tiny calculation has one stable implementation and no requirement for interchangeable alternatives.",
        "A context has a growing conditional selecting different implementations of the same calculation.",
        "Users choose among several route-building algorithms while the application is running.",
        "Several contexts should reuse different compression algorithms through a common contract."
      ],
      "answer": 0,
      "explanation": "Если маленький стабильный алгоритм имеет один вариант, отдельная Strategy может не давать пользы.",
      "topic": "Strategy",
      "source": "Прикреплённый квиз 4, вопрос 11",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-4-12",
      "set": "import-4",
      "number": 12,
      "prompt": "An editor needs requests that can be queued and executed later. A route planner needs interchangeable algorithms for calculating a route. Which pairing best matches these two requirements?",
      "options": [
        "Editor: Strategy; route planner: Command.",
        "Editor: Facade; route planner: Observer.",
        "Editor: Command; route planner: Strategy.",
        "Editor: Observer; route planner: Facade."
      ],
      "answer": 2,
      "explanation": "Command представляет запрос как объект для очереди или отложенного запуска; Strategy выбирает алгоритм выполнения задачи.",
      "topic": "Strategy",
      "source": "Прикреплённый квиз 4, вопрос 12",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-4-13",
      "set": "import-4",
      "number": 13,
      "prompt": "Auction stores the current highest bid and sends updates to BidPanel and MobileAlert when that value changes. Which object plays the Subject role?",
      "options": [
        "The shared update() method.",
        "BidPanel.",
        "MobileAlert.",
        "Auction."
      ],
      "answer": 3,
      "explanation": "Auction хранит наблюдаемую ставку и уведомляет подписчиков, поэтому является Subject.",
      "topic": "Observer",
      "source": "Прикреплённый квиз 4, вопрос 13",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-4-14",
      "set": "import-4",
      "number": 14,
      "prompt": "Inventory notifies registered listeners through Listener.update(stock). A new audit log must react to the same notifications. Which addition best preserves the existing loose coupling?",
      "options": [
        "Make Inventory inherit from AuditLog so it can call the logging code directly.",
        "Implement Listener in AuditLog and register an AuditLog instance with Inventory.",
        "Add an AuditLog field and a special audit-only branch inside Inventory's notification loop.",
        "Copy Inventory's stock state into a second unrelated inventory object for the log."
      ],
      "answer": 1,
      "explanation": "AuditLog реализует существующий Listener и регистрируется; Inventory не нужен особый код для нового типа.",
      "topic": "Observer",
      "source": "Прикреплённый квиз 4, вопрос 14",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-4-15",
      "set": "import-4",
      "number": 15,
      "prompt": "Each Sensor has its own subscription list. What number is printed by this code?\n\n// java.util classes are imported.\ninterface Listener { void update(int value); }\nclass Display implements Listener {\n    int calls = 0;\n    public void update(int value) { calls++; }\n}\nclass Sensor {\n    private final List<Listener> listeners = new ArrayList<>();\n    void subscribe(Listener listener) { listeners.add(listener); }\n    void change(int value) {\n        for (Listener listener : listeners) listener.update(value);\n    }\n}\n// Statements inside main:\nSensor first = new Sensor();\nSensor second = new Sensor();\nDisplay display = new Display();\nfirst.subscribe(display);\nsecond.change(5);\nSystem.out.println(display.calls);",
      "options": [
        "5",
        "1",
        "0",
        "2"
      ],
      "answer": 2,
      "explanation": "display подписан на first, но событие происходит у second. Уведомлений нет, счётчик остаётся 0.",
      "topic": "Observer",
      "source": "Прикреплённый квиз 4, вопрос 15",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-4-16",
      "set": "import-4",
      "number": 16,
      "prompt": "This subject stores subscriptions in a list that allows duplicates. add() adds one entry, remove() removes only the first matching entry, and notifyObservers() invokes update() once per list entry. A and B are distinct objects; callbacks do not change the list. How many updates does each receive?\n\n// The subject's list is initially empty.\nsubject.add(A);\nsubject.add(A);\nsubject.add(B);\nsubject.notifyObservers();\nsubject.remove(A);\nsubject.notifyObservers();",
      "options": [
        "A receives 2; B receives 2.",
        "A receives 3; B receives 2.",
        "A receives 4; B receives 2.",
        "A receives 2; B receives 1."
      ],
      "answer": 1,
      "explanation": "Первый обход: A дважды, B один раз. После удаления одной A: ещё A и B. Итого A = 3, B = 2.",
      "topic": "Observer",
      "source": "Прикреплённый квиз 4, вопрос 16",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-4-17",
      "set": "import-4",
      "number": 17,
      "prompt": "EventManager keeps separate subscription lists for \"open\" and \"save\". unsubscribe(type, listener) removes the listener only from that type's list. Starting with empty lists, which listeners receive the final save notification? Ignore notification order.\n\nevents.subscribe(\"open\", logger);\nevents.subscribe(\"save\", logger);\nevents.subscribe(\"save\", email);\nevents.unsubscribe(\"open\", logger);\nevents.notify(\"save\", file);",
      "options": [
        "Only email.",
        "Only logger.",
        "Both logger and email.",
        "Neither logger nor email."
      ],
      "answer": 2,
      "explanation": "Удалена только open-подписка logger. На save всё ещё подписаны logger и email.",
      "topic": "Observer",
      "source": "Прикреплённый квиз 4, вопрос 17",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-4-18",
      "set": "import-4",
      "number": 18,
      "prompt": "The list contains first, failing and last, in that order. first.update() returns normally; failing.update() throws a RuntimeException. There is no exception handler in this method or inside the callbacks. In this implementation, what happens to last?\n\nvoid notifyObservers(int value) {\n    for (Observer observer : observers) {\n        observer.update(value);\n    }\n}",
      "options": [
        "Its update() is not called during this notification because the exception exits the method.",
        "Its update() is retried three times before the exception propagates.",
        "Its update() is called because Observer automatically isolates exceptions between subscribers.",
        "Its update() runs on a new thread after failing throws."
      ],
      "answer": 0,
      "explanation": "Необработанное исключение выходит из синхронного метода, поэтому до last цикл не доходит.",
      "topic": "Observer",
      "source": "Прикреплённый квиз 4, вопрос 18",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-4-19",
      "set": "import-4",
      "number": 19,
      "prompt": "Two observers depend on one publisher, but its public contract does not specify notification order. What is safe to assume from the Observer pattern alone?",
      "options": [
        "The observer registered last must always receive the next event first.",
        "The observer registered first must always finish before every other observer.",
        "Neither observer is guaranteed to run first solely because the design uses Observer.",
        "All observer callbacks must begin simultaneously."
      ],
      "answer": 2,
      "explanation": "Без явного контракта нельзя предполагать, кто получит событие первым; паттерн сам порядок не определяет.",
      "topic": "Observer",
      "source": "Прикреплённый квиз 4, вопрос 19",
      "origin": "imported",
      "finalCore": true,
      "answerSource": "provided"
    },
    {
      "id": "import-4-20",
      "set": "import-4",
      "number": 20,
      "prompt": "Document elements already support accept(Visitor). An HTML export operation needs different formatting for Paragraph, Image and Table. Where should those type-specific export implementations normally be grouped in a Visitor design?",
      "options": [
        "In a concrete HtmlExportVisitor, with a visit method for each supported element type.",
        "In every element's accept() method, with HTML generation mixed into dispatch.",
        "In the collection class, using a new type switch for every export operation.",
        "In the Visitor interface as mutable fields containing HTML for every possible element instance."
      ],
      "answer": 0,
      "explanation": "HtmlExportVisitor объединяет одну операцию экспорта, реализуя отдельный visit для каждого типа элемента.",
      "topic": "Visitor",
      "source": "Прикреплённый квиз 4, вопрос 20",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-4-21",
      "set": "import-4",
      "number": 21,
      "prompt": "CountVisitor already implements visit(Article). Which method correctly completes the class by implementing the remaining Visitor operation?\n\nclass Article { }\nclass Image { }\ninterface Visitor {\n    void visit(Article article);\n    void visit(Image image);\n}\nclass CountVisitor implements Visitor {\n    int articles = 0, images = 0;\n    public void visit(Article article) { articles++; }\n    // ________\n}",
      "options": [
        "public void accept(Image image) { images++; }",
        "public void visit(Visitor visitor) { images++; }",
        "private void visit(Image image) { images++; }",
        "public void visit(Image image) { images++; }"
      ],
      "answer": 3,
      "explanation": "Нужен public void visit(Image image), совпадающий с контрактом интерфейса. Private уменьшил бы доступность.",
      "topic": "Visitor",
      "source": "Прикреплённый квиз 4, вопрос 21",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-4-22",
      "set": "import-4",
      "number": 22,
      "prompt": "A structure contains Book and Magazine elements. It needs two independent operations: collecting statistics and exporting JSON. Which organization most closely follows Visitor?",
      "options": [
        "Use BookVisitor and MagazineVisitor; each contains every operation for just one element type.",
        "Put a flag for every operation into every element constructor and let the container interpret it.",
        "Put both operations into one accept() method in each element and remove the visitor interface.",
        "Use StatisticsVisitor and JsonVisitor; each implements visits for both Book and Magazine."
      ],
      "answer": 3,
      "explanation": "Каждая операция получает свой visitor, который умеет работать и с Book, и с Magazine.",
      "topic": "Visitor",
      "source": "Прикреплённый квиз 4, вопрос 22",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-4-23",
      "set": "import-4",
      "number": 23,
      "prompt": "A conventional Visitor interface has one abstract visit method for every concrete element type, with no defaults or fallback method. Which planned change is most likely to require edits to all existing concrete visitor implementations?",
      "options": [
        "Add a new concrete element type that every existing visitor must support.",
        "Add another operation by creating a new visitor for the existing element types.",
        "Create more instances of element types already supported by all visitors.",
        "Reorder the elements in a collection while keeping all element types unchanged."
      ],
      "answer": 0,
      "explanation": "Новый тип элемента добавляет метод в Visitor и требует реализации во всех существующих visitors.",
      "topic": "Visitor",
      "source": "Прикреплённый квиз 4, вопрос 23",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-4-24",
      "set": "import-4",
      "number": 24,
      "prompt": "TextFile inherits accept() without overriding it. What does the final statement print?\n\ninterface Visitor {\n    void visit(FileNode file);\n    void visit(TextFile file);\n}\nclass FileNode {\n    void accept(Visitor v) { v.visit(this); }\n}\nclass TextFile extends FileNode { }\nclass Printer implements Visitor {\n    public void visit(FileNode file) { System.out.print(\"F\"); }\n    public void visit(TextFile file) { System.out.print(\"T\"); }\n}\n// Statements inside main:\nFileNode file = new TextFile();\nfile.accept(new Printer());",
      "options": [
        "T",
        "FT",
        "Nothing; the call fails to compile.",
        "F"
      ],
      "answer": 3,
      "explanation": "accept() унаследован из FileNode, где тип this — FileNode. Выбирается перегрузка visit(FileNode), печатающая F.",
      "topic": "Visitor",
      "source": "Прикреплённый квиз 4, вопрос 24",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-4-25",
      "set": "import-4",
      "number": 25,
      "prompt": "The programmer wants a total across all items, but creates a new visitor inside each loop iteration. What number does this code actually print?\n\ninterface Visitor { void visit(Item item); }\nclass Item {\n    final int value;\n    Item(int value) { this.value = value; }\n    void accept(Visitor visitor) { visitor.visit(this); }\n}\nclass TotalVisitor implements Visitor {\n    int total = 0;\n    public void visit(Item item) { total += item.value; }\n}\n// Statements inside main:\nItem[] items = {new Item(4), new Item(7)};\nint result = 0;\nfor (Item item : items) {\n    TotalVisitor visitor = new TotalVisitor();\n    item.accept(visitor);\n    result = visitor.total;\n}\nSystem.out.println(result);",
      "options": [
        "11",
        "0",
        "7",
        "2"
      ],
      "answer": 2,
      "explanation": "На каждой итерации создаётся новый аккумулятор; result перезаписывается. Последний элемент даёт 7, а не общую сумму 11.",
      "topic": "Visitor",
      "source": "Прикреплённый квиз 4, вопрос 25",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-4-26",
      "set": "import-4",
      "number": 26,
      "prompt": "Which dependency statement accurately describes the conventional Visitor structure with type-specific visit methods?",
      "options": [
        "Every element must hold a reference to each concrete visitor class that may ever be created.",
        "Visitors never refer to concrete element types; all type-specific behavior is removed from the design.",
        "Declaring accept() gives every visitor unrestricted access to the element's private fields.",
        "Visitors know the concrete element types they handle, while elements can accept the shared Visitor interface."
      ],
      "answer": 3,
      "explanation": "Visitor знает конкретные типы элементов через visit-методы, а элементы принимают общий интерфейс Visitor.",
      "topic": "Visitor",
      "source": "Прикреплённый квиз 4, вопрос 26",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-4-27",
      "set": "import-4",
      "number": 27,
      "prompt": "EnrollmentRules has twelve methods implementing one coherent set of enrollment policies. UtilityManager has two methods: one changes tax-report formatting and the other changes network authentication. Which assessment best follows the Single Responsibility Principle?",
      "options": [
        "Both classes satisfy SRP if all methods are declared private.",
        "UtilityManager necessarily satisfies SRP because two methods make a class small.",
        "EnrollmentRules necessarily violates SRP because any class with more than one method has multiple responsibilities.",
        "UtilityManager has distinct reasons to change despite having fewer methods; method count alone does not establish SRP."
      ],
      "answer": 3,
      "explanation": "SRP оценивает связность ответственности и причины изменений. Два несвязанных метода могут нарушать SRP сильнее двенадцати согласованных.",
      "topic": "Clean Code",
      "source": "Прикреплённый квиз 4, вопрос 27",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-4-28",
      "set": "import-4",
      "number": 28,
      "prompt": "Every new export format requires editing a growing switch inside a tested ExportService. The team wants new formats to be added through implementations of an established export interface, leaving the core dispatch logic stable. Which SOLID principle motivates this change most directly?",
      "options": [
        "Open/Closed Principle.",
        "Liskov Substitution Principle.",
        "Interface Segregation Principle.",
        "Single Responsibility Principle."
      ],
      "answer": 0,
      "explanation": "OCP предлагает расширять систему новыми реализациями стабильного интерфейса, не изменяя основную логику выбора.",
      "topic": "Clean Code",
      "source": "Прикреплённый квиз 4, вопрос 28",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-4-29",
      "set": "import-4",
      "number": 29,
      "prompt": "BatchSender.send(batch) promises to accept batches containing 1 to 100 valid items. FastSender is declared as a subtype but rejects batches with more than 10 items. Why does using FastSender in place of BatchSender violate Liskov Substitution?",
      "options": [
        "A subtype is required to store exactly the same private fields as its base type.",
        "Subtypes are required to run at exactly the same speed as the base implementation.",
        "Adding a narrower accepted range is always permitted as long as the method name remains unchanged.",
        "FastSender strengthens the precondition, rejecting inputs that clients may validly pass to the base type."
      ],
      "answer": 3,
      "explanation": "FastSender усиливает предусловие: допустимые для базового типа 11–100 элементов теперь отвергаются, нарушая подстановку.",
      "topic": "Clean Code",
      "source": "Прикреплённый квиз 4, вопрос 29",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-4-30",
      "set": "import-4",
      "number": 30,
      "prompt": "A balance-display screen only needs getBalance(), but it depends on a large BankingOperations interface that also includes transfer(), closeAccount() and approveLoan(). Which change best applies Interface Segregation to this client?",
      "options": [
        "Combine BankingOperations with other application interfaces so all clients use one common type.",
        "Make the screen call every banking operation once so none of the interface methods is unused.",
        "Move every banking operation into the screen to avoid referring to an interface.",
        "Let the screen depend on a focused balance-reading interface containing the operation it needs."
      ],
      "answer": 3,
      "explanation": "ISP позволяет экрану зависеть от узкого интерфейса чтения баланса, без ненужных банковских операций.",
      "topic": "Clean Code",
      "source": "Прикреплённый квиз 4, вопрос 30",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-4-31",
      "set": "import-4",
      "number": 31,
      "prompt": "ReportService receives CsvWriter through its constructor, but its field and calls remain tied to that concrete class. A developer says constructor injection alone proves compliance with Dependency Inversion. Which response is most accurate?",
      "options": [
        "The claim becomes true only if the CsvWriter field is declared static.",
        "The claim is false because DIP prohibits constructors from accepting dependencies.",
        "Injection separates construction from use, but DIP also requires an appropriate abstraction rather than this concrete writer dependency.",
        "The claim is always true because any constructor parameter automatically becomes an interface."
      ],
      "answer": 2,
      "explanation": "Передача зависимости через конструктор отделяет создание от использования. Для DIP нужна также подходящая абстракция вместо зависимости от CsvWriter.",
      "topic": "Clean Code",
      "source": "Прикреплённый квиз 4, вопрос 31",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-4-32",
      "set": "import-4",
      "number": 32,
      "prompt": "A small test for a new behavior now fails as expected. According to the third law of Test-Driven Development in the lecture, how much production code should be written next?",
      "options": [
        "Only enough to make the currently failing test pass.",
        "Every likely future extension so the design will never need to change.",
        "No production code; the failing assertion should be removed instead.",
        "The entire planned feature, including behavior that has no tests yet."
      ],
      "answer": 0,
      "explanation": "После ожидаемо падающего теста пишут минимальный рабочий код, достаточный для его прохождения.",
      "topic": "Clean Code",
      "source": "Прикреплённый квиз 4, вопрос 32",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-4-33",
      "set": "import-4",
      "number": 33,
      "prompt": "A test prints actual and expected results, but a person must inspect the console to decide whether they match. Which F.I.R.S.T. quality is most directly missing?",
      "options": [
        "Independent.",
        "Self-validating.",
        "Fast.",
        "Timely."
      ],
      "answer": 1,
      "explanation": "Self-validating означает автоматический однозначный результат. Ручное сравнение вывода этому не соответствует.",
      "topic": "Clean Code",
      "source": "Прикреплённый квиз 4, вопрос 33",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-4-34",
      "set": "import-4",
      "number": 34,
      "prompt": "To make unit tests convenient, a developer proposes changing every private field of Order into a public field. Which response best follows the lecture's guidance on encapsulation?",
      "options": [
        "Remove tests for Order because encapsulated classes cannot be tested.",
        "Make all fields public because test code must always inspect the complete internal representation.",
        "Duplicate the production calculations inside the tests so the Order object need not be exercised.",
        "Prefer testing observable behavior through suitable interfaces and expose only what has a clear purpose."
      ],
      "answer": 3,
      "explanation": "Проверять лучше наблюдаемое поведение через подходящий интерфейс; тесты не требуют делать все поля публичными.",
      "topic": "Clean Code",
      "source": "Прикреплённый квиз 4, вопрос 34",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-4-35",
      "set": "import-4",
      "number": 35,
      "prompt": "SalesReport accepts a SalesRepository interface through its constructor. A test supplies FakeSalesRepository with fixed data. What testing benefit follows from separating construction from use in this way?",
      "options": [
        "The report logic can be exercised with controlled data without constructing a real database repository.",
        "All unit tests become integration tests because a constructor parameter is used.",
        "The fake makes every possible production database failure impossible.",
        "The report no longer needs to obey the repository interface contract."
      ],
      "answer": 0,
      "explanation": "FakeSalesRepository даёт контролируемые данные и позволяет проверять отчёт без реальной базы.",
      "topic": "Clean Code",
      "source": "Прикреплённый квиз 4, вопрос 35",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-4-36",
      "set": "import-4",
      "number": 36,
      "prompt": "A shared helper removes the same calculation from three methods. Required behavior and all relevant tests are preserved, and the helper has a clear name. The total number of methods increases by one. How does this fit the lecture's simple-design rules?",
      "options": [
        "It necessarily makes the design worse because adding any method violates simple design.",
        "It is valid only if the tests are deleted so the project contains fewer methods overall.",
        "It can improve the design because removing duplication and expressing intent take priority over minimizing method count.",
        "It is a behavior change merely because the implementation now has another method."
      ],
      "answer": 2,
      "explanation": "Работающие тесты, отсутствие дублирования и понятность важнее минимального количества методов.",
      "topic": "Clean Code",
      "source": "Прикреплённый квиз 4, вопрос 36",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-4-37",
      "set": "import-4",
      "number": 37,
      "prompt": "Two threads call increment() once on the same object, with count initially 0. Assume this exact interleaving: both threads read count into old before either writes; then both perform their assignments. After both calls finish, what is count?\n\nclass Counter {\n    private int count = 0;\n    void increment() {\n        int old = count;\n        count = old + 1;\n    }\n}",
      "options": [
        "3, because the second assignment adds its result to the first assignment.",
        "1, because both threads write the result of 0 + 1 and one update is lost.",
        "2, because two completed method calls guarantee two atomic increments.",
        "0, because local variables prevent the assignments from updating the shared field."
      ],
      "answer": 1,
      "explanation": "Оба потока прочитали 0 и записали 1. Одна прибавка потеряна: итог 1.",
      "topic": "Clean Code",
      "source": "Прикреплённый квиз 4, вопрос 37",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-4-38",
      "set": "import-4",
      "number": 38,
      "prompt": "Which change is an example of refactoring, assuming the existing externally observable behavior is required to remain the same?",
      "options": [
        "Extract duplicated parsing logic into a named helper while preserving accepted inputs, results and errors.",
        "Add a previously unsupported command-line option that produces a new result.",
        "Change invalid-input handling from throwing an exception to silently returning zero.",
        "Change the default output format from text to JSON while reorganizing the parser classes."
      ],
      "answer": 0,
      "explanation": "Refactoring меняет внутреннюю структуру при сохранении наблюдаемых результатов, допустимых входов и ошибок.",
      "topic": "Clean Code",
      "source": "Прикреплённый квиз 4, вопрос 38",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-4-39",
      "set": "import-4",
      "number": 39,
      "prompt": "Why should a Git commit message explain the purpose of a change rather than just say \"updated files\"?",
      "options": [
        "It replaces the need to inspect or test the changed code.",
        "It helps later readers understand the change and investigate why the code evolved.",
        "It makes Git automatically resolve all future merge conflicts.",
        "It guarantees that the commit has no defects."
      ],
      "answer": 1,
      "explanation": "Осмысленное сообщение коммита сохраняет причину изменения и помогает позже разбираться в истории кода.",
      "topic": "Clean Code",
      "source": "Прикреплённый квиз 4, вопрос 39",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "import-4-40",
      "set": "import-4",
      "number": 40,
      "prompt": "Two students edit the same function on separate feature branches. When they merge, Git reports a conflict. What is the appropriate next step?",
      "options": [
        "Keep whichever branch has the later timestamp because Git timestamps establish correctness.",
        "Review both intended changes, resolve the conflict, test the combined result and record the resolved merge.",
        "Delete both branches and recreate the repository because a conflict means the history is unusable.",
        "Commit the conflict markers unchanged so the compiler can choose the correct branch."
      ],
      "answer": 1,
      "explanation": "Нужно совместить намерения обеих правок, разрешить конфликт, проверить результат и записать завершённое слияние.",
      "topic": "Clean Code",
      "source": "Прикреплённый квиз 4, вопрос 40",
      "origin": "imported",
      "finalCore": false,
      "answerSource": "provided"
    },
    {
      "id": "gen-l1-1",
      "lecture": "lecture-1",
      "topic": "Builder",
      "prompt": "A builder has title = \"Draft\". title(x) assigns x and returns this. What title does new Builder().title(\"A\").title(\"B\").build() use?",
      "options": [
        "Draft",
        "A",
        "B",
        "Both A and B"
      ],
      "answer": 2,
      "explanation": "Второй вызов заменяет значение поля title на B; build() использует последнее значение.",
      "source": "Lecture 1, slides 9, 12",
      "origin": "generated",
      "finalCore": true
    },
    {
      "id": "gen-l1-2",
      "lecture": "lecture-1",
      "topic": "Builder",
      "prompt": "A product has twelve optional settings. Which design best makes construction readable without a constructor for every combination?",
      "options": [
        "A Builder with named configuration steps",
        "An Observer for every setting",
        "A separate subclass for every combination",
        "A single constructor with twelve unnamed booleans"
      ],
      "answer": 0,
      "explanation": "Builder позволяет задавать нужные поля по именам и не создавать конструктор для каждой комбинации.",
      "source": "Lecture 1, slides 7–9, 16",
      "origin": "generated",
      "finalCore": true
    },
    {
      "id": "gen-l1-3",
      "lecture": "lecture-1",
      "topic": "Builder",
      "prompt": "A fluent builder method must support b.title(\"Final\").build(). What should title() normally return?",
      "options": [
        "The final Product immediately",
        "The assigned String",
        "void",
        "The builder itself"
      ],
      "answer": 3,
      "explanation": "Возврат this позволяет вызвать следующий метод builder в той же цепочке.",
      "source": "Lecture 1, slides 9, 12",
      "origin": "generated",
      "finalCore": true
    },
    {
      "id": "gen-l1-4",
      "lecture": "lecture-1",
      "topic": "Builder",
      "prompt": "A Director calls setSeats(2), setGPS(true), then build(). A client needs a custom four-seat car. Which statement is correct?",
      "options": [
        "The pattern forbids custom configurations",
        "The client can use the builder directly without the Director",
        "The client must change the Product to become a Director",
        "Every Builder must have exactly one Director"
      ],
      "answer": 1,
      "explanation": "Director необязателен: он хранит готовую последовательность шагов, а клиент может задать свою.",
      "source": "Lecture 1, slides 8–13",
      "origin": "generated",
      "finalCore": true
    },
    {
      "id": "gen-l1-5",
      "lecture": "lecture-1",
      "topic": "Builder",
      "prompt": "A Car.Builder field hasGPS starts as false. The client sets seats and engine but never calls setGPS(). What does the lecture-style build method copy into the product?",
      "options": [
        "true because GPS is optional",
        "null",
        "false",
        "A random value"
      ],
      "answer": 2,
      "explanation": "Если метод настройки не вызван, build() копирует начальное значение поля builder.",
      "source": "Lecture 1, slides 12",
      "origin": "generated",
      "finalCore": true
    },
    {
      "id": "gen-l1-6",
      "lecture": "lecture-1",
      "topic": "Builder",
      "prompt": "A team wants the same construction steps to create a car or its manual. What should change between the two builds?",
      "options": [
        "The concrete builder that implements the steps",
        "The client's programming language",
        "Every step name and its order must change",
        "The pattern must become Observer"
      ],
      "answer": 0,
      "explanation": "Разные Concrete Builders могут реализовать общие шаги и выдавать разные продукты.",
      "source": "Lecture 1, slides 8, 10, 13",
      "origin": "generated",
      "finalCore": true
    },
    {
      "id": "gen-l1-7",
      "lecture": "lecture-1",
      "topic": "Design Patterns",
      "prompt": "Which classification is correct?",
      "options": [
        "Builder is structural; Decorator is behavioral",
        "Builder is behavioral; Facade is creational",
        "All design patterns are algorithms with identical implementations",
        "Builder is creational; Decorator is structural"
      ],
      "answer": 3,
      "explanation": "Builder относится к созданию объектов, а Decorator — к их композиции и структуре.",
      "source": "Lecture 1, slides 2–6",
      "origin": "generated",
      "finalCore": false
    },
    {
      "id": "gen-l1-8",
      "lecture": "lecture-1",
      "topic": "Clean Code",
      "prompt": "A method mixes sendReport() with dozens of low-level string append calls. Which refactoring best follows one level of abstraction?",
      "options": [
        "Put all code on one line",
        "Extract formatting details into a clearly named helper",
        "Rename every variable to one letter",
        "Add a boolean flag for each append call"
      ],
      "answer": 1,
      "explanation": "Высокоуровневый сценарий и низкоуровневые детали лучше разделить на функции разных уровней.",
      "source": "Lecture 1, slides 14",
      "origin": "generated",
      "finalCore": false
    },
    {
      "id": "gen-l1-9",
      "lecture": "lecture-1",
      "topic": "Clean Code",
      "prompt": "A method named getBalance() returns a balance and secretly deletes old payments. What is the main problem?",
      "options": [
        "The method has no arguments",
        "The return type is numeric",
        "It cannot be called from Java",
        "It hides a state-changing side effect inside a query"
      ],
      "answer": 3,
      "explanation": "Имя обещает чтение данных, но скрытое удаление нарушает предсказуемость и разделение command/query.",
      "source": "Lecture 1, slides 15",
      "origin": "generated",
      "finalCore": false
    },
    {
      "id": "gen-l1-10",
      "lecture": "lecture-1",
      "topic": "Clean Code",
      "prompt": "Two methods contain identical validation logic. Which change best follows DRY?",
      "options": [
        "Copy it into every caller",
        "Remove validation completely",
        "Extract shared validation into a well-named helper",
        "Replace every condition with a comment"
      ],
      "answer": 2,
      "explanation": "Общую логику стоит хранить в одном месте, чтобы исправления не расходились между копиями.",
      "source": "Lecture 1, slides 15",
      "origin": "generated",
      "finalCore": false
    },
    {
      "id": "gen-l5-1",
      "lecture": "lecture-5",
      "topic": "Decorator",
      "prompt": "A base drink costs 800. Milk returns inner.cost() + 150, and Syrup returns inner.cost() + 250. What does new Syrup(new Milk(base)).cost() return?",
      "options": [
        "950",
        "1200",
        "1050",
        "400"
      ],
      "answer": 1,
      "explanation": "Считаем изнутри наружу: 800 + 150 + 250 = 1200.",
      "source": "Lecture 5, slides 7–9, 17–18",
      "origin": "generated",
      "finalCore": true
    },
    {
      "id": "gen-l5-2",
      "lecture": "lecture-5",
      "topic": "Decorator",
      "prompt": "A decorator's cost() returns only 200 instead of inner.cost() + 200. What behavior is lost?",
      "options": [
        "The wrapped object's cost is no longer included",
        "The decorator cannot hold a field",
        "The client loses all Java type information",
        "The base object's price automatically becomes 200"
      ],
      "answer": 0,
      "explanation": "Без делегирования обёртка игнорирует стоимость основы и предыдущих слоёв; сам базовый объект не меняется.",
      "source": "Lecture 5, slides 7, 14, 17–18",
      "origin": "generated",
      "finalCore": true
    },
    {
      "id": "gen-l5-3",
      "lecture": "lecture-5",
      "topic": "Decorator",
      "prompt": "Base returns 100. Add10 returns inner.value() + 10. Double returns inner.value() * 2. What does new Double(new Add10(base)).value() return?",
      "options": [
        "210",
        "120",
        "200",
        "220"
      ],
      "answer": 3,
      "explanation": "Внутренний слой даёт 110, внешний умножает на 2: 220. Обратный порядок дал бы 210.",
      "source": "Lecture 5, slides 19, 31",
      "origin": "generated",
      "finalCore": true
    },
    {
      "id": "gen-l5-4",
      "lecture": "lecture-5",
      "topic": "Decorator",
      "prompt": "Why should both a base beverage and its decorators implement Beverage?",
      "options": [
        "So every decorator must inherit the base price as a constant",
        "So the client can use plain and decorated objects through the same contract",
        "So only one decorator can ever be applied",
        "So wrapping automatically changes the base object's class"
      ],
      "answer": 1,
      "explanation": "Общий интерфейс делает обёртку взаимозаменяемой с компонентом и позволяет вкладывать слои.",
      "source": "Lecture 5, slides 8–9, 14",
      "origin": "generated",
      "finalCore": true
    },
    {
      "id": "gen-l5-5",
      "lecture": "lecture-5",
      "topic": "Decorator",
      "prompt": "A base notifier sends email. SmsDecorator delegates to inner.send() and then sends SMS. What happens when new SmsDecorator(base).send() runs?",
      "options": [
        "Only SMS is sent",
        "No notification is sent",
        "Email is sent, then SMS",
        "The base notifier is permanently rewritten"
      ],
      "answer": 2,
      "explanation": "Decorator вызывает основу и затем добавляет свой канал, не изменяя код основы.",
      "source": "Lecture 5, slides 22–26",
      "origin": "generated",
      "finalCore": true
    },
    {
      "id": "gen-l5-6",
      "lecture": "lecture-5",
      "topic": "Decorator",
      "prompt": "A new logging feature should wrap any existing Service implementation without changing Service clients. Which design best fits Decorator?",
      "options": [
        "LoggingService implements Service, stores a Service, and delegates calls",
        "LoggingService removes all Service methods",
        "Service clients inspect every concrete class with instanceof",
        "Create a copy of every service class with logging pasted into it"
      ],
      "answer": 0,
      "explanation": "Обёртка сохраняет интерфейс, принимает любой совместимый компонент и добавляет поведение вокруг вызова.",
      "source": "Lecture 5, slides 14, 28, 37",
      "origin": "generated",
      "finalCore": true
    },
    {
      "id": "gen-l5-7",
      "lecture": "lecture-5",
      "topic": "Decorator",
      "prompt": "A drink costs 500. Each Milk decorator adds 100. What is new Milk(new Milk(base)).cost()?",
      "options": [
        "600 because duplicates are ignored",
        "500 because decorators only change descriptions",
        "1000 because the base is called twice and added twice",
        "700 because both layers add 100"
      ],
      "answer": 3,
      "explanation": "Каждый слой добавляет свою цену к одному вложенному результату: 500 + 100 + 100.",
      "source": "Lecture 5, slides 5, 8, 18",
      "origin": "generated",
      "finalCore": true
    },
    {
      "id": "gen-l5-8",
      "lecture": "lecture-5",
      "topic": "Adapter",
      "prompt": "An app calls process(amount), but a legacy gateway offers charge(amount, currency). Which pattern directly addresses this mismatch?",
      "options": [
        "Decorator, because it must preserve the original method set",
        "Adapter, because it translates one interface into another",
        "Builder, because it creates notifications",
        "Observer, because it broadcasts the amount"
      ],
      "answer": 1,
      "explanation": "Adapter реализует ожидаемый Target API и переводит вызов в API Adaptee. Decorator сохраняет общий интерфейс.",
      "source": "Lecture 5, slides 33–36",
      "origin": "generated",
      "finalCore": false
    },
    {
      "id": "gen-l5-9",
      "lecture": "lecture-5",
      "topic": "Clean Code",
      "prompt": "A query finds no employees. Which return value usually avoids unnecessary null checks while preserving collection semantics?",
      "options": [
        "null",
        "A list containing one null element",
        "An empty list",
        "A random exception for every empty result"
      ],
      "answer": 2,
      "explanation": "Пустой список позволяет безопасно перебирать результат и выражает отсутствие элементов без null.",
      "source": "Lecture 5, slides 46",
      "origin": "generated",
      "finalCore": false
    },
    {
      "id": "gen-l5-10",
      "lecture": "lecture-5",
      "topic": "Clean Code",
      "prompt": "A vendor API throws three exception types, but the application handles all three identically. What is a useful boundary design?",
      "options": [
        "Wrap the vendor API and translate them into one meaningful application exception",
        "Duplicate three identical catch blocks in every caller",
        "Ignore every exception and report success",
        "Expose vendor-specific exceptions in every domain interface"
      ],
      "answer": 0,
      "explanation": "Обёртка уменьшает зависимость от сторонней библиотеки и объединяет ошибки, требующие одной реакции. Причину стоит сохранить.",
      "source": "Lecture 5, slides 44–45",
      "origin": "generated",
      "finalCore": false
    },
    {
      "id": "gen-l6-1",
      "lecture": "lecture-6",
      "topic": "Facade",
      "prompt": "watchMovie() calls lights.dim(), screen.down(), and player.play() in that order. Each method prints its name. What is the output order?",
      "options": [
        "play, down, dim",
        "down, dim, play",
        "dim, play, down",
        "dim, down, play"
      ],
      "answer": 3,
      "explanation": "Facade координирует вызовы в порядке строк своего метода: dim, затем down, затем play.",
      "source": "Lecture 6, slides 6–9",
      "origin": "generated",
      "finalCore": true
    },
    {
      "id": "gen-l6-2",
      "lecture": "lecture-6",
      "topic": "Facade",
      "prompt": "Many clients repeat the same eight calls to start a theater. Which change most directly applies Facade?",
      "options": [
        "Require every client to copy the eight calls",
        "Provide watchMovie() that coordinates the subsystem components",
        "Make all components extend the client class",
        "Replace all components with Observer callbacks"
      ],
      "answer": 1,
      "explanation": "Facade предоставляет простой высокоуровневый метод для повторяющегося сценария сложной подсистемы.",
      "source": "Lecture 6, slides 3, 6–10",
      "origin": "generated",
      "finalCore": true
    },
    {
      "id": "gen-l6-3",
      "lecture": "lecture-6",
      "topic": "Facade",
      "prompt": "After introducing a TheaterFacade, an advanced client needs a projector setting that the facade does not expose. Which statement is correct?",
      "options": [
        "Direct subsystem access can still be allowed",
        "The pattern requires deleting the projector's public API",
        "A facade must expose every possible subsystem method",
        "The facade must become a subclass of Projector"
      ],
      "answer": 0,
      "explanation": "Паттерн упрощает частые сценарии, но сам по себе не запрещает прямой доступ к подсистеме.",
      "source": "Lecture 6, slides 4, 23, 29",
      "origin": "generated",
      "finalCore": true
    },
    {
      "id": "gen-l6-4",
      "lecture": "lecture-6",
      "topic": "Facade",
      "prompt": "One facade now manages video conversion, payroll, email and inventory. What is the best design response?",
      "options": [
        "Add every future operation to the same facade",
        "Make every subsystem aware of the facade's internal state",
        "Split it into focused facades for related use cases",
        "Remove all subsystem classes and copy their code into the facade"
      ],
      "answer": 2,
      "explanation": "Слишком широкий фасад рискует стать god object. Отдельные фасады сохраняют связанные обязанности вместе.",
      "source": "Lecture 6, slides 16, 19–20, 31",
      "origin": "generated",
      "finalCore": true
    },
    {
      "id": "gen-l6-5",
      "lecture": "lecture-6",
      "topic": "Facade",
      "prompt": "A library has a usable but complicated API. The goal is one easy method for a common workflow, not compatibility with a required interface. Which pattern fits best?",
      "options": [
        "Adapter only, because every wrapper is an adapter",
        "Builder, because all methods create something",
        "Observer, because the library has many objects",
        "Facade, because the goal is simpler subsystem access"
      ],
      "answer": 3,
      "explanation": "Главное отличие — цель: Facade упрощает использование, Adapter исправляет несовместимость интерфейсов.",
      "source": "Lecture 6, slides 5, 10, 14",
      "origin": "generated",
      "finalCore": true
    },
    {
      "id": "gen-l6-6",
      "lecture": "lecture-6",
      "topic": "Facade",
      "prompt": "A client calls facade.convertVideo(). Inside, codec conversion succeeds but audioMixer.fix() throws an exception that is not caught. What happens to a following return statement?",
      "options": [
        "It always runs because Facade guarantees success",
        "It is skipped as the exception propagates",
        "It reruns codec conversion automatically",
        "It silently returns an empty file"
      ],
      "answer": 1,
      "explanation": "Facade — способ организации кода, а не автоматическая обработка ошибок. Неперехваченное исключение прерывает обычный поток метода.",
      "source": "Lecture 6, slides 17, 21, 32",
      "origin": "generated",
      "finalCore": true
    },
    {
      "id": "gen-l6-7",
      "lecture": "lecture-6",
      "topic": "Testing",
      "prompt": "Test B passes only when Test A runs first and creates shared data. Which F.I.R.S.T. property is violated?",
      "options": [
        "Independent",
        "Fast",
        "Self-validating",
        "Timely"
      ],
      "answer": 0,
      "explanation": "Тест должен самостоятельно готовить свои условия и не зависеть от порядка выполнения соседних тестов.",
      "source": "Lecture 6, slides 41",
      "origin": "generated",
      "finalCore": false
    },
    {
      "id": "gen-l6-8",
      "lecture": "lecture-6",
      "topic": "Testing",
      "prompt": "A test prints two large logs and asks a developer to decide whether they match. Which F.I.R.S.T. property is missing?",
      "options": [
        "Timely",
        "Independent",
        "Self-validating",
        "Fast"
      ],
      "answer": 2,
      "explanation": "Тест должен автоматически выдавать pass/fail через проверки, а не требовать ручного сравнения.",
      "source": "Lecture 6, slides 41",
      "origin": "generated",
      "finalCore": false
    },
    {
      "id": "gen-l6-9",
      "lecture": "lecture-6",
      "topic": "Testing",
      "prompt": "According to the three laws of TDD, what should happen before writing new production behavior?",
      "options": [
        "Implement the entire feature and then consider tests",
        "Write a minimal failing test for that behavior",
        "Write every possible test for the whole application",
        "Delete the existing test suite"
      ],
      "answer": 1,
      "explanation": "Сначала пишется минимальный падающий тест, затем только код, необходимый для его прохождения.",
      "source": "Lecture 6, slides 35",
      "origin": "generated",
      "finalCore": false
    },
    {
      "id": "gen-l6-10",
      "lecture": "lecture-6",
      "topic": "Testing",
      "prompt": "Which test layout best follows Build–Operate–Check?",
      "options": [
        "Assert, modify production code, print logs",
        "Call the system, then invent input values, then read logs manually",
        "Prepare all other tests, run them, ignore their results",
        "Prepare input, perform the action, assert the expected result"
      ],
      "answer": 3,
      "explanation": "Build готовит состояние, Operate выполняет действие, Check автоматически проверяет результат.",
      "source": "Lecture 6, slides 39–40",
      "origin": "generated",
      "finalCore": false
    },
    {
      "id": "gen-l7-1",
      "lecture": "lecture-7",
      "topic": "Strategy",
      "prompt": "A navigator can calculate driving, walking or cycling routes. Which design best represents Strategy?",
      "options": [
        "Create one global variable for every route",
        "Put route algorithms behind a shared interface and delegate to the selected object",
        "Make every route class inherit from the user interface",
        "Notify all route algorithms whenever a button is clicked"
      ],
      "answer": 1,
      "explanation": "Strategy объединяет альтернативные алгоритмы одной задачи общим интерфейсом; контекст делегирует выбранному варианту.",
      "source": "Lecture 7, slides 15–19",
      "origin": "generated",
      "finalCore": true
    },
    {
      "id": "gen-l7-2",
      "lecture": "lecture-7",
      "topic": "Strategy",
      "prompt": "In Strategy, what is the main responsibility of the Context?",
      "options": [
        "Implement every algorithm in a switch",
        "Always choose the cheapest algorithm by itself",
        "Make all concrete strategies extend the Context",
        "Use the selected strategy through the common interface"
      ],
      "answer": 3,
      "explanation": "Context хранит или получает стратегию и вызывает её контракт. Выбор обычно выполняет клиент или конфигурация.",
      "source": "Lecture 7, slides 6–7, 19",
      "origin": "generated",
      "finalCore": true
    },
    {
      "id": "gen-l7-3",
      "lecture": "lecture-7",
      "topic": "Strategy",
      "prompt": "A calculator first uses Add, then switches to Multiply. Both calls use inputs 4 and 5. What are the two results?",
      "options": [
        "9, then 20",
        "20, then 9",
        "9, then 9",
        "The Context must be recreated before switching"
      ],
      "answer": 0,
      "explanation": "Первый выбранный алгоритм складывает 4 + 5; после смены стратегии следующий вызов вычисляет 4 × 5.",
      "source": "Lecture 7, slides 11, 13, 20",
      "origin": "generated",
      "finalCore": true
    },
    {
      "id": "gen-l7-4",
      "lecture": "lecture-7",
      "topic": "Strategy",
      "prompt": "An existing context already accepts a SortingStrategy. What is normally needed to add a new sorting algorithm?",
      "options": [
        "Rewrite every existing sorting algorithm",
        "Add a subclass for each context-and-algorithm combination",
        "Implement SortingStrategy and configure the client to select it",
        "Replace the interface with concrete type checks inside the context"
      ],
      "answer": 2,
      "explanation": "Новая реализация расширяет набор алгоритмов без изменения делегирования в контексте. Клиенту нужно выбрать этот вариант.",
      "source": "Lecture 7, slides 10–13, 22–23",
      "origin": "generated",
      "finalCore": true
    },
    {
      "id": "gen-l7-5",
      "lecture": "lecture-7",
      "topic": "Strategy",
      "prompt": "Which statement correctly compares Strategy with Template Method?",
      "options": [
        "Both require changing the superclass for every new algorithm",
        "Strategy uses composition; Template Method varies steps through inheritance",
        "Strategy can only run at compile time",
        "Template Method is the subscription mechanism of Observer"
      ],
      "answer": 1,
      "explanation": "Strategy подставляет объект алгоритма; Template Method оставляет каркас алгоритма в базовом классе и меняет шаги через подклассы.",
      "source": "Lecture 7, slide 23",
      "origin": "generated",
      "finalCore": true
    },
    {
      "id": "gen-l7-6",
      "lecture": "lecture-7",
      "topic": "Strategy",
      "prompt": "What is a realistic drawback of using Strategy for only two tiny, stable calculations?",
      "options": [
        "It makes runtime selection impossible",
        "It requires every strategy to share mutable global state",
        "It prevents unit testing",
        "The extra abstractions may add unnecessary complexity"
      ],
      "answer": 3,
      "explanation": "Лекция предупреждает о лишней сложности в простых стабильных случаях. Паттерн стоит применять при полезной вариативности.",
      "source": "Lecture 7, slides 23, 33",
      "origin": "generated",
      "finalCore": true
    },
    {
      "id": "gen-l7-7",
      "lecture": "lecture-7",
      "topic": "Strategy",
      "prompt": "A context calls strategy.execute(), but strategy was never initialized and is null. What happens in Java?",
      "options": [
        "A NullPointerException is thrown",
        "Java automatically chooses the first implementation",
        "All implementations run in sequence",
        "The call silently returns zero"
      ],
      "answer": 0,
      "explanation": "Вызов экземплярного метода через null вызывает NullPointerException. Стратегия должна быть установлена до выполнения.",
      "source": "Lecture 7, slides 11, 33",
      "origin": "generated",
      "finalCore": true
    },
    {
      "id": "gen-l7-8",
      "lecture": "lecture-7",
      "topic": "Strategy",
      "prompt": "A strategy interface declares exactly one abstract method. Which concise Java option can implement a simple strategy?",
      "options": [
        "An import statement",
        "An enum constant with no behavior",
        "A compatible lambda expression",
        "A package declaration"
      ],
      "answer": 2,
      "explanation": "Интерфейс с одним абстрактным методом является функциональным и допускает подходящую лямбду.",
      "source": "Lecture 7, slides 32–33",
      "origin": "generated",
      "finalCore": true
    },
    {
      "id": "gen-l7-9",
      "lecture": "lecture-7",
      "topic": "Clean Code",
      "prompt": "According to the Single Responsibility Principle, what is the best measure of whether a class does too much?",
      "options": [
        "Whether it has more than one method",
        "Whether it has multiple independent reasons to change",
        "Whether its file name is longer than ten letters",
        "Whether it uses an interface"
      ],
      "answer": 1,
      "explanation": "SRP оценивает независимые ответственности и причины изменения, а не фиксированное число методов или строк.",
      "source": "Lecture 7, slides 38–39",
      "origin": "generated",
      "finalCore": false
    },
    {
      "id": "gen-l7-10",
      "lecture": "lecture-7",
      "topic": "Clean Code",
      "prompt": "Half of a class's methods use only billing fields; the other half use only unrelated display fields. What does this suggest?",
      "options": [
        "All fields should become public",
        "The class must be a singleton",
        "The class is automatically highly cohesive",
        "The two groups may belong in separate cohesive classes"
      ],
      "answer": 3,
      "explanation": "Раздельные группы методов и данных указывают на возможные отдельные ответственности. Их выделение может повысить cohesion.",
      "source": "Lecture 7, slides 40–41",
      "origin": "generated",
      "finalCore": false
    },
    {
      "id": "gen-l7-11",
      "lecture": "lecture-7",
      "topic": "Clean Code",
      "prompt": "Why should PortfolioManager depend on a StockExchange interface instead of a specific network API implementation?",
      "options": [
        "To allow substitution and isolated tests without the real API",
        "To guarantee all external API calls are always successful",
        "To remove the need for any implementation",
        "To expose all provider fields publicly"
      ],
      "answer": 0,
      "explanation": "Зависимость от абстракции позволяет подставить тестовый источник и заменить провайдера, не связывая бизнес-логику с его деталями.",
      "source": "Lecture 7, slides 42–43",
      "origin": "generated",
      "finalCore": false
    },
    {
      "id": "gen-l7-12",
      "lecture": "lecture-7",
      "topic": "Clean Code",
      "prompt": "Which choice best supports encapsulation?",
      "options": [
        "Make every field public so other classes can edit it",
        "Expose helper methods even when no client needs them",
        "Keep internal fields private and expose a focused public contract",
        "Avoid methods and share all data directly"
      ],
      "answer": 2,
      "explanation": "Инкапсуляция скрывает внутренние детали и ограничивает зависимость других классов необходимым публичным контрактом.",
      "source": "Lecture 7, slides 35–37",
      "origin": "generated",
      "finalCore": false
    },
    {
      "id": "gen-l8-1",
      "lecture": "lecture-8",
      "topic": "Observer",
      "prompt": "Which situation is the clearest use of Observer?",
      "options": [
        "Choosing exactly one of several sorting algorithms",
        "Updating multiple registered displays when weather data changes",
        "Constructing an order step by step",
        "Converting an incompatible API into a required interface"
      ],
      "answer": 1,
      "explanation": "Observer связывает один источник события с заинтересованными подписчиками, которые реагируют на изменение.",
      "source": "Lecture 8, slides 3–11, 19",
      "origin": "generated",
      "finalCore": true
    },
    {
      "id": "gen-l8-2",
      "lecture": "lecture-8",
      "topic": "Observer",
      "prompt": "A and B are subscribed. Event X is published, then B is unsubscribed, then event Y is published. Who receives Y?",
      "options": [
        "Both A and B",
        "Only B",
        "Neither observer",
        "Only A"
      ],
      "answer": 3,
      "explanation": "Отписанный B исключён из списка для последующего события Y; A остаётся подписанным.",
      "source": "Lecture 8, slides 8, 21–22",
      "origin": "generated",
      "finalCore": true
    },
    {
      "id": "gen-l8-3",
      "lecture": "lecture-8",
      "topic": "Observer",
      "prompt": "What should a publisher normally know about its subscribers?",
      "options": [
        "That they implement the required observer interface",
        "Every subscriber's internal fields",
        "The source code of every concrete subscriber",
        "The exact user interface layout of each subscriber"
      ],
      "answer": 0,
      "explanation": "Общий интерфейс update достаточен для уведомлений; детали конкретного слушателя издателю не нужны.",
      "source": "Lecture 8, slides 11, 26, 36",
      "origin": "generated",
      "finalCore": true
    },
    {
      "id": "gen-l8-4",
      "lecture": "lecture-8",
      "topic": "Observer",
      "prompt": "A logger subscribes only to 'open'; an email listener subscribes only to 'save'. EventManager publishes 'save'. Which listener runs?",
      "options": [
        "Only the logger",
        "Both listeners regardless of their subscriptions",
        "Only the email listener",
        "No listener because event types are not allowed"
      ],
      "answer": 2,
      "explanation": "EventManager выбирает список по типу события. Подписка на open не включает save.",
      "source": "Lecture 8, slides 38–41",
      "origin": "generated",
      "finalCore": true
    },
    {
      "id": "gen-l8-5",
      "lecture": "lecture-8",
      "topic": "Observer",
      "prompt": "Observers read the publisher's current state inside update(). Which sequence prevents them from seeing the old state?",
      "options": [
        "Notify first, then update state",
        "Update state first, then notify",
        "Remove every observer before updating",
        "Notify twice before storing the new value"
      ],
      "answer": 1,
      "explanation": "В WeatherStation сначала присваивается новое weather, затем вызывается notifyObservers. Наблюдатель получает актуальное состояние.",
      "source": "Lecture 8, slide 21",
      "origin": "generated",
      "finalCore": true
    },
    {
      "id": "gen-l8-6",
      "lecture": "lecture-8",
      "topic": "Observer",
      "prompt": "What does the Observer pattern itself guarantee about notification order?",
      "options": [
        "Subscribers always run alphabetically",
        "Subscribers always run in reverse registration order",
        "Subscribers always run on separate threads",
        "No universal order; the implementation must define any required order"
      ],
      "answer": 3,
      "explanation": "У паттерна нет общей гарантии порядка. Конкретный List-цикл может соблюдать порядок регистрации, но зависимость от порядка нужно проектировать явно.",
      "source": "Lecture 8, slides 17, 21, 32",
      "origin": "generated",
      "finalCore": true
    },
    {
      "id": "gen-l8-7",
      "lecture": "lecture-8",
      "topic": "Observer",
      "prompt": "A long-lived publisher holds strong references to temporary screen listeners. What should happen when a screen is no longer needed?",
      "options": [
        "Unsubscribe its listener so the publisher no longer retains it",
        "Register the same listener repeatedly",
        "Keep the listener forever to improve garbage collection",
        "Replace the publisher interface with a concrete screen type"
      ],
      "answer": 0,
      "explanation": "Ссылка из долгоживущего издателя может удерживать ненужный объект. Управление отпиской помогает избежать такого удержания.",
      "source": "Lecture 8, slides 31, 42",
      "origin": "generated",
      "finalCore": true
    },
    {
      "id": "gen-l8-8",
      "lecture": "lecture-8",
      "topic": "Observer",
      "prompt": "A new dashboard needs the same events as existing listeners. Which change best preserves loose coupling?",
      "options": [
        "Add a dashboard-specific branch inside every publisher method",
        "Give the publisher access to all dashboard fields",
        "Implement the listener interface in the dashboard and subscribe it",
        "Make all existing listeners inherit from the dashboard"
      ],
      "answer": 2,
      "explanation": "Новый наблюдатель реализует уже известный издателю контракт и регистрируется. Издателю не нужна новая зависимость от конкретного класса.",
      "source": "Lecture 8, slides 11, 31–32, 42",
      "origin": "generated",
      "finalCore": true
    },
    {
      "id": "gen-l8-9",
      "lecture": "lecture-8",
      "topic": "Clean Code",
      "prompt": "Which example best demonstrates constructor dependency injection?",
      "options": [
        "A business method creates a new concrete database connection on every call",
        "A service receives a Repository through its constructor",
        "A service searches a global registry for its own dependencies",
        "A service exposes all internal fields as static"
      ],
      "answer": 1,
      "explanation": "При DI внешний код передаёт готовую зависимость. Сам объект не создаёт и не ищет её.",
      "source": "Lecture 8, slides 45–47",
      "origin": "generated",
      "finalCore": false
    },
    {
      "id": "gen-l8-10",
      "lecture": "lecture-8",
      "topic": "Clean Code",
      "prompt": "What does separating construction from use mean?",
      "options": [
        "Business logic must know every startup detail",
        "Every domain method should create its own infrastructure",
        "Objects should never be constructed",
        "Startup code builds and wires objects; application logic uses them"
      ],
      "answer": 3,
      "explanation": "Main или конфигурация отвечают за сборку системы, а приложение работает с уже подготовленными объектами.",
      "source": "Lecture 8, slides 45–47",
      "origin": "generated",
      "finalCore": false
    },
    {
      "id": "gen-l8-11",
      "lecture": "lecture-8",
      "topic": "Clean Code",
      "prompt": "Logging and security rules need to apply across many unrelated business classes. How are these concerns described?",
      "options": [
        "Cross-cutting concerns that can be modularized with aspects",
        "Concrete sorting strategies only",
        "Proof that every class must be merged into one",
        "A requirement to expose all domain fields"
      ],
      "answer": 0,
      "explanation": "Сквозные задачи затрагивают много компонентов. AOP позволяет вынести единое дополнительное поведение из бизнес-классов.",
      "source": "Lecture 8, slides 50–51",
      "origin": "generated",
      "finalCore": false
    },
    {
      "id": "gen-l8-12",
      "lecture": "lecture-8",
      "topic": "Clean Code",
      "prompt": "Which approach to system growth is recommended in the lecture?",
      "options": [
        "Predict all future requirements and never refactor",
        "Choose the most complex standard before understanding the problem",
        "Implement current needs, keep concerns separate, and evolve through refactoring and tests",
        "Mix framework infrastructure into every domain method"
      ],
      "answer": 2,
      "explanation": "Лекция предлагает развивать систему постепенно: сегодняшние требования, разделение ответственности, проверка и последующее расширение.",
      "source": "Lecture 8, slides 48, 52",
      "origin": "generated",
      "finalCore": false
    }
  ],
  "notes": [
    "Все 160 вопросов и их английские варианты перенесены из четырёх прикреплённых квизов; оценки, отметки Moodle и подсказки внутри вариантов удалены.",
    "Квиз 1 не содержит готового ключа ответов: ответы восстановлены по смыслу вопросов и обозначены answerSource=inferred. Квизы 2–4 используют предоставленные ключи.",
    "Квиз 1, вопросы 14 и 20: множественное наследование относится к классической схеме Class Adapter из формулировки. В Java возможен вариант extends Adaptee + implements Target, когда Target — интерфейс.",
    "Квиз 1, вопрос 25: «Adapter обычно оборачивает один объект, Facade — подсистему» является сравнением типичных структур, а не обязательным ограничением числа объектов.",
    "Русские объяснения добавлены для подготовки и не являются дословным текстом преподавателя."
  ]
};
