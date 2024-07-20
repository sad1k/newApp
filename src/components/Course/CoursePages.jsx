import { MathJax } from "better-react-mathjax";
import MyAccordion from "../MyAccordion";
import s from "./styles.module.css";
import Line from "./components/Line";
import Circle from "./components/Circle";
import InterfaceInfo from "./components/InterfaceInfo";

export const renderContent = (currentPage) => {
  switch (currentPage) {
    case 1:
      return (
        <div>
          <MathJax key={100 + 1}>
            <h2>Вершины и ребра</h2>
            <p>
              Граф - это набор вершин
              <Circle color={"#ff7f0e"} />
              <Circle color={"Tomato"} />
              <Circle color={"MediumSeaGreen"} />
              соединенные между собой ребрами
              <Line />
              <Line />
              <Line />
              Обозначим множество всех вершин через {"\\(\\ V \\)"} и множество
              всех ребер как {"\\(\\ E \\)"}
            </p>
            <p>
              Понятно? Теперь простыми словами: Граф состоит из двух компонентов
              -<b> набор вершин</b>
              {"\\(\\ V \\)"} и <b>набор ребер</b> {"\\(\\ E \\)"}. Здесь ребро
              - это нечто, служащее связующим звеном между двумя вершинами!
            </p>
            <p>
              Если ребро соединяет две вершины {"\\(\\ v_{1} \\)"} и{" "}
              {"\\(\\ v_{2} \\)"}, тогда обозначим ребро через{" "}
              {"\\(\\ v_{1}v_{2} \\)"}, это то же самое, что{" "}
              {"\\(\\ v_{2}v_{1} \\)"}.
            </p>
            <p>
              Две вершины считаются <b>соседними</b>, если они соединены ребром.
            </p>
            <p>
              Теперь прочитайте инструкции ниже и создайте свой собственный
              граф. Вы увидите соответствующие множества {"\\(\\ V \\)"} и{" "}
              {"\\(\\ E \\)"} под областью графика. Начните играть и освоитесь с
              обозначениями наборов.
            </p>
            <InterfaceInfo />
          </MathJax>
        </div>
      );
    case 2:
      return (
        <div>
          <MathJax key={100 + 2}>
            <h2>Степень и размер графа</h2>
            <p>Степень графа это количество вершин в графе.</p>
            <p>Размер графа это количество ребер в графе </p>
            <p>
              Создайте несколько собственных графов и понаблюдайте за их
              порядком и размером. Сделай несколько раз, чтобы привыкнуть к
              терминам.
            </p>
            <p>
              Теперь очистите граф и нарисуйте некоторое количество вершин
              (скажем {"\\(\\ n \\)"} ). Постарайтесь достичь максимального
              размера с помощью этих вершинами. Попробуйте сделать это для
              разных Постарайтесь достичь максимального размера с помощью этих
              вершинами. Попробуйте сделать это для разных значений
              {"\\(\\ n \\)"}.
            </p>
            <p>
              Заметили что-нибудь? Каков максимальный размер графа порядка{" "}
              {"\\(\\ n \\)"} ?
            </p>
            <p className={s.Hint}>
              <span className={s.HintWord}>Подсказка:</span> Максимальный размер
              достигается когда все вершины соединены друг с другом.
            </p>
            <p>
              Ответ вы найдете ниже. Нет, пока не смотрите. Очистите график и
              повторите попытку несколько раз.
            </p>
            <MyAccordion title={"Click to see the answer"}>
              <p>Ответ {"\\(\\ \\frac{n(n-1)}{2} \\)"}.</p>
              <p>
                Но почему? Потому что максимальное количество ребер, которые вы
                можете нарисовать, равно количеству способов выбора двух вершин.
              </p>
              <p>
                Давайте выберем первую вершину и назовем ее{"\\(\\ a \\)"}. Мы
                можем выбрать {"\\(\\ a \\)"} вершину
                {"\\(\\ n \\)"} способами. Чтобы выбрать другую вершину, нам
                остается {"\\(\\ n-1 \\)"} вершина. Таким образом, мы можем
                выбрать две вершины
                {"\\(\\ n(n-1) \\)"} способами, правильно?
              </p>
              <p>
                Нет. Это потому, что мы посчитали дважды. А что если{" "}
                {"\\(\\ b \\)"} была бы выбрана первой и {"\\(\\ a \\)"} второй
                вершиной? Поняли? Помните, что {"\\(\\ ab \\)"} и{" "}
                {"\\(\\ ba \\)"} представляют собой один и то же ребро.
              </p>

              <p>
                Следовательно, мы делим на {"\\(\\ 2 \\)"} и получаем{" "}
                {"\\(\\ \\frac{n(n-1)}{2} \\)"} как ответ.
              </p>
            </MyAccordion>
            <InterfaceInfo />
          </MathJax>
        </div>
      );
    case 3:
      return (
        <div>
          <MathJax key={100 + 19}>
            <h2>Степень вершины</h2>
            <p>
              Степень вершины - это количество ребер, соединяющиеся с ней. Она
              говорит сколько других вершин являются соседними с этой вершиной.
            </p>
            <p>
              На диаграмме каждая вершина обозначена степенью. Сделайте
              несколько изменения и посмотрите, как изменится степень вершин.
            </p>
            <p>
              Степень вершины {"\\(\\ v \\)"} обозначается {"\\(\\ deg(v) \\)"}{" "}
              Вершины с {"\\(\\ deg(v)=0 \\)"} являются одинокими волками - ни к
              кому не привязанные. У нас есть специальное название для них них.
            </p>
            <p>
              Вершины c <b>нулевой степенью</b> называется{" "}
              <b>изолированными вершинами</b>. У них нет других вершин
              соединенных с ними.
            </p>
            <p>
              Минимальная степень в графе {"\\(\\ G \\)"} символизируется{" "}
              {"\\(\\ \\delta(G) \\)"} и максимальная
              {"\\(\\ \\Delta(G) \\)"} чтобы не перепутать их, помните that{" "}
              {"\\(\\ \\delta \\)"} это "малая дельта" и {"\\(\\ \\Delta \\)"}{" "}
              это "большая дельта".{" "}
            </p>
            <p className={s.Hint}>
              {" "}
              <span className={s.HintWord}>Примечание:</span> Помните, что{" "}
              {"\\(\\ \\delta \\)"} и {"\\(\\ \\Delta \\)"} это свойства графа,
              в то время как {"\\(\\ deg \\)"} свойство вершины.
            </p>
            <InterfaceInfo />
          </MathJax>
        </div>
      );
    case 4:
      return (
        <div>
          <MathJax key={100 + 4}>
            <h2>Последовательность степеней</h2>
            <p>
              <b>Последовательность степеней</b> графа - это список степеней
              всех вершин графа. Обычно мы перечисляем степени в{" "}
              <b>не возрастающем порядке</b>, то есть от наибольшей степени к
              наименьшей степени.
            </p>
            <p className={s.Hint}>
              <span className={s.HintWord}>Примечание:</span> Степенной
              последовательностью графа всегда является невозрастающая
              последовательность. Поэтому у каждого графа есть{" "}
              <b>уникальная степенная последовательность</b>.
            </p>
            <p>
              На диаграмме текст внутри каждой вершины указывает её степень.
              Нарисуйте несколько графов самостоятельно и определите их
              степенную последовательность.
            </p>
            <p>
              Вы заметите, что сумма степеней вершин всегда в два раза больше
              числа рёбер в графе. Это математически доказанный результат
              (теорема).
            </p>
            <p className={s.Theorem}>
              <span className={s.TheoremWord}>Теорема:</span> Сумма степеней
              всех вершин графа равна удвоенному числу рёбер в графе.
              Математически,
              <p className={s.CenterFormula}>
                {"\\(\\ \\sum deg(v_{i})= 2\\left | E \\right | \\)"}
              </p>
              где, {"\\(\\ \\left | E \\right | \\)"}
              обозначает число рёбер в графе (размер графа).
            </p>
            <p>
              Обоснование этого результата достаточно простое. Ребро является
              связью между двумя вершинами, поэтому каждое ребро вносит вклад 2
              в сумму степеней. Следовательно, сумма степеней должна быть в два
              раза больше числа рёбер.
            </p>

            <InterfaceInfo />
          </MathJax>
        </div>
      );
    case 5:
      return (
        <div>
          <MathJax key={100 + 5}>
            <h2>Графическая последовательность</h2>
            <p>
              Последовательность чисел называется графической, если мы можем
              построить граф, в котором эта последовательность является
              степенной последовательностью вершин.
            </p>
            <p>
              Хорошо, это было немного запутанно. Так что же такое графическая
              последовательность?
            </p>
            <p>
              Допустим, у вас есть список чисел. Присвойте каждое число
              отдельной вершине. Теперь, можете ли вы соединить эти вершины
              таким образом, чтобы каждая вершина имела количество соседей,
              равное присвоенному ей числу? Если да, то список чисел является
              графической последовательностью. Если нет, то нет. Со временем это
              станет более понятно.
            </p>
            <p>
              <b>Пример 1:</b> Последовательность {"\\(\\ (3,3,2,1,1,0) \\)"}{" "}
              является графической. На диаграмме вы можете увидеть, что вершины
              имеют эти числа в качестве своих степеней. Обратите внимание, что
              последовательность остается графической, даже если вы уберете{" "}
              {"\\(\\ 0 \\)"}.
            </p>
            <p className={s.Hint}>
              <span className={s.HintWord}>Примечание:</span>{" "}
              Последовательность, содержащая только нули, всегда является
              графической.
            </p>
            <p>
              <b>Пример 2:</b> Последовательность {"\\(\\ (4,3,2,1) \\)"} не
              является графической. Нам нужно по крайней мере четыре других
              вершины, чтобы удовлетворить степень вершины со степенью 4. Но у
              нас есть только три.
            </p>
            <p>
              <b>Пример 3:</b> Последовательность {"\\(\\ (4,3,3,2,2,1) \\)"} не
              является графической. Напомним, что сумма степеней вершин должна
              быть четной, так как она равна удвоенному числу рёбер. Здесь это
              не так.
            </p>
            <p></p>
            Следующие последовательности являются графическими. Попробуйте
            нарисовать граф для каждой из них. Вы можете увидеть решение, нажав
            на ссылку рядом с ними:
            {"\\(\\ (5,1,1,1,1,1) \\)"} Показать решение
            {"\\(\\ (2,2,2,2,2) \\)"} Показать решение
            {"(4,4,4,4,4,0)"} Показать решение
            {"(3,3,2,2,2)"} Показать решение
            {"(5,3,3,3,2,2)"} Показать решение
            <p className={s.Hint}>
              <span className={s.HintWord}>Примечание:</span> Граф имеет
              уникальную последовательность степеней. Однако для одной и той же
              графической последовательности может существовать несколько разных
              графов.
            </p>
            <InterfaceInfo />
          </MathJax>
        </div>
      );
    case 6:
      return (
        <div>
          <MathJax key={100 + 7}>
            <h2>Принцип Дирихле</h2>
            <p>
              Принцип Дирихле очень прост и интуитивно понятен, но его
              применения в дискретной математике встречаются удивительно часто.
            </p>
            <p className={s.Theorem}>
              <span className={s.TheoremWord}>Принцип Дирихле: </span>
              Если мы распределим n голубей по меньшему количеству гнезд, чем n,
              то по крайней мере одно гнездо будет содержать более одного
              голубя.
            </p>
            <p>
              Вы можете заменить <i>голубей</i> на <i>объекты</i>, а{" "}
              <i>гнезда</i> на коробки. Таким образом, принцип гласит, что если
              у нас больше объектов, чем коробок, и мы распределим все объекты
              по этим коробкам, то по крайней мере одна коробка будет содержать
              более одного объекта.
            </p>
            <p>
              Самое сложное - это применение этой теоремы. Вам нужно будет
              решить, какие объекты будут представлять голубей, а какие -
              гнезда.
            </p>
            <p>
              <b>Пример 1:</b> Вы заметили, что в этих уроках всего десять
              разных цветов вершин? Поэтому, если в графе больше десяти вершин,
              то по крайней мере одна пара вершин будет одного цвета! Проверьте
              это сами. Десять цветов можно считать десятью гнездами, а каждую
              вершину - голубем.
            </p>
            <p className={s.Theorem}>
              <span className={s.TheoremWord}>Пример 2:</span>В любом графе с
              более чем одной вершиной, по крайней мере одна пара вершин имеет
              одинаковую степень.
            </p>
            <p>
              Это означает, что не может существовать граф{" "}
              {"\\(\\ степени>= 2 \\)"} с полностью различными степенями вершин.
              Какая-то степень обязательно будет повторяться. Проверьте это
              сами, нарисовав граф {"\\(\\ степени>= 2 \\)"}
            </p>
            <p>
              Но почему это происходит? Попробуйте найти объяснение. Помогите
              себе, пытаясь нарисовать граф, в котором все вершины имеют разные
              степени.
            </p>
            <p className={s.Hint}>
              <span className={s.HintWord}>Подсказка:</span>
              Предположите {"\\(\\ степень=n \\)"} и подумайте о диапазоне
              значений степеней в терминах {"\\(\\ n \\)"}.
            </p>
            <MyAccordion title={"Нажмите, чтобы увидеть ответ"}>
              <>
                <p>
                  Предположим, наш граф имеет {"\\(\\ степень=n \\)"}. Вершина
                  может быть соединена максимум с {"\\(\\ n-1 \\)"} другими
                  вершинами. Таким образом,{" "}
                  {"\\(\\ 0 <= deg(v_{i}) <= n - 1 \\)"}.
                </p>
                <p>
                  Кажется, что для наших {"\\(\\ n \\)"} вершин есть{" "}
                  {"\\(\\ n \\)"} вариантов для степеней от {"\\(\\ 0 \\)"} до{" "}
                  {"\\(\\ n-1 \\)"}. Таким образом, если рассматривать различные
                  степени как гнезда, а вершины как голубей, разве не должно
                  быть возможным иметь {"\\(\\ n \\)"} различных степеней?
                </p>
                <p>Нет. Наши дальнейшие наблюдения объясняют почему.</p>
                <p>
                  Обратите внимание, что в графе порядка {"\\(\\ n \\)"},
                  вершины со степенями {"\\(\\ 0 \\)"} и {"\\(\\ n-1 \\)"} не
                  могут существовать одновременно.
                </p>
                <p>
                  Если существует вершина со степенью 0, это означает, что эта
                  вершина не соединена ни с одной другой вершиной.
                  Следовательно, вершина не может быть соединена со всеми
                  остальными {"\\(\\ n-1 \\)"} вершинами. Таким образом, в этом
                  случае {"\\(\\ 0 <= deg(v_{i}) <= n-2 \\)"}.
                </p>
                <p>
                  Если не существует вершины со степенью 0, то в этом случае{" "}
                  {"\\(\\ 1 <= deg(v_{i}) <= n-1 \\)"}.
                </p>
                <p>
                  В обоих случаях у нас есть n вершин (голубей), но только{" "}
                  {"\\(\\ n-1 \\)"} возможных степеней (гнезд). Таким образом,
                  мы гарантированно имеем гнездо (степень) с более чем одним
                  голубем (вершиной).
                </p>
              </>
            </MyAccordion>
            <InterfaceInfo />
          </MathJax>
        </div>
      );
    case 7:
      return (
        <div>
          <MathJax key={100 + 8}>
            <h2>Регулярный граф</h2>
            <p>
              Граф, в котором все вершины имеют одинаковую степень, называется{" "}
              <b>регулярным графом</b>.
            </p>
            <p>
              Регулярный граф, где степень каждой вершины равна {"\\(\\ k \\)"},
              называется
              {"\\(\\ k-регулярным \\)"}.
            </p>
            <p>
              На рисунке показан {"\\(\\ 3-регулярный \\)"} граф порядка{" "}
              {"\\(\\ 6 \\)"}.
            </p>
            <p>Попробуйте построить следующие регулярные графы.</p>
            <p>
              Решения к вышеупомянутым задачам не предоставлены. Вы должны быть
              в состоянии решить их самостоятельно. Если вы испытываете
              трудности с рисованием графов, можете воспользоваться подсказкой
              ниже. Но сначала попробуйте сами.
            </p>
            <p className={s.Hint}>
              <MyAccordion title={"Нажмите"}>
                <>
                  <span className={s.HintWord}>Подсказка:</span>
                  Определите степенную последовательность регулярного графа.
                  Затем используйте алгоритм Хавела-Хакими для построения графа.
                  Обратите внимание, что текст в вершине представляет её
                  степень, а не целевую степень.
                </>
              </MyAccordion>
            </p>
            <p>
              Теперь небольшое задание для вас. Найдите количество рёбер в{" "}
              {"\\(\\ k-регулярном \\)"} графе порядка {"\\(\\ n \\)"} . Начните
              с построения и наблюдения за регулярными графами малого порядка.
              Если вы не сможете решить, ниже приведён ответ.
            </p>
            <p className={s.Theorem}>
              <MyAccordion title={"Нажмите, чтобы увидеть ответ"}>
                <>
                  <p className={s.CenterFormula}>
                    {"\\(\\ |E| = \\frac{nk}{2} \\)"}
                  </p>
                  <p>
                    Это выводится из факта, что сумма степеней вершин равна
                    удвоенному числу рёбер.
                  </p>
                  <p className={s.CenterFormula}>
                    {"\\(\\ \\sum deg(v_{i})=2|E| \\)"}
                  </p>
                  <p>Здесь сумма степеней вершин равна {"\\(\\ nk \\)"}.</p>
                  <p>
                    Также мы видим, что сумма степеней {"\\(\\ (nk) \\)"} будет
                    нечётным числом, когда и {"\\(\\ n \\)"} и {"\\(\\ k \\)"}{" "}
                    нечётны. Мы не можем иметь дробное число рёбер, и поэтому
                    регулярный граф, где и {"\\(\\ n \\)"} и {"\\(\\ k \\)"}{" "}
                    нечётны, не может существовать.
                  </p>
                </>
              </MyAccordion>
            </p>
            <InterfaceInfo />
          </MathJax>
        </div>
      );
    case 8:
      return (
        <div>
          <MathJax key={100 + 9}>
            <h2>Полный граф</h2>
            <p>
              Граф, в котором каждая вершина соединена с каждой другой вершиной,
              называется <b>полным графом</b>.
            </p>
            <p>
              Заметьте, что степень каждой вершины будет {"\\(\\ n-1 \\)"}, где{" "}
              {"\\(\\ n \\)"} - порядок графа.
            </p>
            <p>
              Таким образом, мы можем сказать, что полный граф порядка{" "}
              {"\\(\\ n \\)"} - это ничто иное, как{" "}
              {"\\(\\ (n-1)-регулярный \\)"} граф порядка {"\\(\\ n \\)"}.
            </p>
            <p>
              Полный граф порядка {"\\(\\ n \\)"} обозначается как{" "}
              {"\\(\\ K_{n} \\)"}.
            </p>
            <p>На рисунке показан полный граф порядка {"\\(\\ 5 \\)"}.</p>
            <p>
              Нарисуйте несколько полных графов самостоятельно и понаблюдайте за
              количеством рёбер.
            </p>
            <p>
              Вы могли заметить, что количество рёбер в полном графе равно{" "}
              {"\\(\\ \\frac{n(n-1)}{2} \\)"}. Это максимальный достижимый
              размер графа порядка {"\\(\\ n \\)"}, как вы узнали в разделе
              Порядок и Размер.
            </p>
            <InterfaceInfo />
          </MathJax>
        </div>
      );
    case 9:
      return (
        <div>
          <MathJax key={100 + 10}>
            <h2>Двудольный граф</h2>
            <p>
              Граф называется <b>двудольным</b>, если мы можем разделить
              множество вершин на два непересекающихся множества таким образом,
              что не существует рёбер между вершинами, принадлежащими одному и
              тому же множеству.
            </p>
            <p>Давайте разберем это подробнее.</p>
            <p>
              Здесь мы разделяем множество вершин на две группы (или множества).
              Каждая вершина попадает в одну из этих групп. Это похоже на
              присвоение каждой вершине метки либо A, либо B.
            </p>
            <p>
              Каждая вершина имеет только одну метку. Таким образом, два
              множества <b>непересекающиеся</b>, то есть у двух множеств нет
              общих вершин.
            </p>
            <p>
              И не должно быть рёбер, соединяющих вершины внутри одного
              множества. Это означает, что каждое ребро проходит между двумя
              вершинами, принадлежащими разным множествам — одна помечена как A,
              другая как B.
            </p>
            <p>
              Таким образом, если мы можем отметить вершины таким образом, то
              граф является двудольным. В противном случае — нет.
            </p>
            <p>
              Нарисуйте несколько графов самостоятельно, чтобы лучше понять это.
            </p>
            <p>
              Для двудольного графа вершины множества {"\\(\\ A \\)"} и{" "}
              {"\\(\\ B \\)"} показаны соответственно оранжевым и зелёным
              цветом. Если граф не является двудольным, вершины будут обычного
              цвета.
            </p>
            <p className={s.Hint}>
              <span className={s.HintWord}>Примечание:</span>
              Изолированные вершины не влияют на то, является ли граф двудольным
              или нет. Их можно игнорировать.
            </p>
            <p>
              Изолированные вершины окрашены в серебряный цвет, чтобы показать,
              что эти вершины игнорируются. Мы можем разместить их случайным
              образом в любом множестве, и наш граф все равно останется
              двудольным (или недвудольным).
            </p>
            <p>Обращали ли вы внимание на сумму степеней двух множеств?</p>
            <p className={s.Theorem}>
              <span className={s.TheoremWord}>Теорема:</span>В двудольном графе
              сумма степеней вершин каждого множества равна количеству рёбер.
              <p className={s.CenterFormula}>
                {"\\(\\ \\sum_{v \\in A}deg(v)=\\sum_{v \\in B}deg(v)=|E| \\)"}
              </p>
            </p>
            <p>Почему это верно? Попробуйте понять сами.</p>
            <InterfaceInfo />
          </MathJax>
        </div>
      );
    case 10:
      return (
        <div>
          <MathJax key={100 + 11}>
            <h2>Полный двудольный граф</h2>
            <p>
              <b>Полный двудольный</b> граф — это особый тип двудольного графа,
              в котором каждая вершина одного множества соединена с каждой
              вершиной другого множества.
            </p>
            <p>
              На рисунке показан двудольный граф, где множество {"\\(\\ A \\)"}{" "}
              (оранжевого цвета) состоит из {"\\(\\ 2 \\)"} вершин, а множество{" "}
              {"\\(\\ B \\)"} (зеленого цвета) состоит из {"\\(\\ 3 \\)"}{" "}
              вершин.
            </p>
            <p>
              Если в двух множествах по {"\\(\\ p \\)"} и {"\\(\\ q \\)"}{" "}
              вершины, то полный двудольный граф обозначается как{" "}
              {"\\(\\ K_{p,q} \\)"}.
            </p>
            <p className={s.Hint}>
              <span className={s.HintWord}>Примечание:</span> Не путайте
              обозначение {"\\(\\ K_{p,q} \\)"} с {"\\(\\ K_{n} \\)"} . Первое
              используется для полного двудольного графа, а второе обозначает
              полный граф. Это разные вещи.
            </p>
            <p className={s.Theorem}>
              <span className={s.TheoremWord}>Свойства:</span> Следующие
              результаты верны для полного двудольного графа{" "}
              {"\\(\\ K_{p,q} \\)"}.
              <ul>
                <li>Порядок графа равен {"\\(\\ |V| = p + q \\)"}.</li>
                <li>Размер графа равен {"\\(\\ |E| = pq \\)"}.</li>
                <li>
                  Это можно использовать для проверки, является ли двудольный
                  граф полным двудольным графом или нет.
                </li>
                <li>
                  Последовательность степеней вершин выглядит как{" "}
                  {"\\(\\ (p,p,...,p,q,...,q) \\)"}, где {"\\(\\ p \\)"}{" "}
                  повторяется {"\\(\\ q \\)"} раз, а {"\\(\\ q \\)"} повторяется{" "}
                  {"\\(\\ p \\)"} раз. Здесь предполагается, что{" "}
                  {"\\(\\ p>q \\)"}.
                </li>
              </ul>
            </p>
            <InterfaceInfo />
          </MathJax>
        </div>
      );
    case 11:
      return (
        <div>
          <MathJax key={100 + 12}>
            <h2>Деревья</h2>
            <p>
              Пришло время узнать о деревьях. Деревья — это особый тип графов,
              которые имеют огромное применение как структура данных в
              вычислительных науках.
            </p>
            <p>Но сначала поговорим о лесах.</p>
            <p>
              <b>Лес</b> — это ациклический граф, то есть граф без циклов. Он
              может быть либо одним связным графом, либо иметь несколько
              несвязанных компонентов. Когда это один связный граф, мы называем
              его деревом.
            </p>
            <p>
              Таким образом, <b>дерево</b> — это связный ациклический граф. А
              лес — это просто набор одного или нескольких деревьев.
            </p>
            <p>
              Поиграйте с графами, чтобы понять, что такое дерево, а что нет. И
              постарайтесь заметить следующие свойства, рисуя их.
            </p>
            <p className={s.Theorem}>
              <span className={s.TheoremWord}>Теорема:</span>
              <p>
                Связный граф является деревом тогда и только тогда, когда его
                порядок на единицу больше его размера. В математической записи
                это можно записать как
              </p>
              <p className={s.CenterFormula}>{"\\(\\ |V|=|E|+1 \\)"}</p>
              <p>
                Обратите внимание, что утверждение является двусторонним. Таким
                образом, оно также означает, что связный граф, удовлетворяющий
                этому уравнению, является деревом.
              </p>
            </p>
            <p className={s.Theorem}>
              <span className={s.TheoremWord}>Свойство:</span>
              Для дерева с более чем одной вершиной существует уникальный путь
              между любыми двумя его вершинами.
            </p>
            <p className={s.Theorem}>
              <span className={s.TheoremWord}>Свойство:</span> Дерево является{" "}
              <b>минимально связным</b>, что означает, что удаление любого
              произвольного ребра из него приведет к преобразованию его в
              несвязный граф.
            </p>
            <InterfaceInfo />
          </MathJax>
        </div>
      );
    default:
      return null;
  }
};

export const renderSubGraphContent = (currentPage, cy, cyEdges, cyNodes) => {
  switch (currentPage) {
    case 1:
      return (
        <>
          <MathJax>
            <div>
              <p className={s.CenterFormula}>
                <MathJax dynamic>
                  {`\\(\\ V = \\begin{Bmatrix} ${
                    cy && cyNodes.map((node, indx) => `v_{${node.data('id')}}`)
                  } \\end{Bmatrix} \\)`}
                </MathJax>
              </p>
            </div>
            <div>
              <p className={s.CenterFormula}>
                <MathJax dynamic>
                  {`\\(\\ E = \\begin{Bmatrix} ${
                    cy &&
                    cyEdges.map(
                      (elem) =>
                        `v_{${elem.data("source")}}v_{${elem.data("target")}}`
                    )
                  } \\end{Bmatrix} \\)`}
                </MathJax>
              </p>
            </div>
          </MathJax>
        </>
      );
    case 2:
      return (
        <>
          <MathJax>
            <div>
              <p
                className={s.CenterFormula}
              >{`\\(\\ Степень \\; графа = ${cyNodes.length}  \\)`}</p>
            </div>
            <div>
              <p
                className={s.CenterFormula}
              >{`\\(\\ Размер = ${cyEdges.length}  \\)`}</p>
            </div>
          </MathJax>
        </>
      );
    case 3:
      let minDegree = Math.min(...cyNodes.map((node) => node.degree()));
      let maxDegree = Math.max(...cyNodes.map((node) => node.degree()));
      return (
        <>
          <MathJax>
            <div>
              <p
                className={s.CenterFormula}
              >{`\\(\\ \\delta(G)=${minDegree} \\)`}</p>
            </div>
            <div>
              <p
                className={s.CenterFormula}
              >{`\\(\\ \\Delta(G)=${maxDegree} \\)`}</p>
            </div>
          </MathJax>
        </>
      );
    case 4:
    case 5:
    case 6: {
      let degrees = cyNodes.map((node) => node.degree());
      degrees.sort((a, b) => b - a);
      return (
        <>
          <MathJax>
            <div>
              <p
                className={s.CenterFormula}
              >{`\\(\\ Последовательность \\; степеней = \\left ( ${degrees} \\right ) \\)`}</p>
            </div>
          </MathJax>
        </>
      );
    }
    case 7:
      let degrees = cyNodes.map((node) => node.degree());
      let cond = degrees.every((degree) => degree === degrees[0]);
      console.log();
      return (
        <>
          <MathJax>
            <div>
              <p
                className={s.CenterFormula}
              >{`\\(\\ Последовательность \\; степеней = \\left ( ${degrees} \\right ) \\)`}</p>
            </div>
            <div>
              <p className={s.CenterFormula}>
                {cond &&
                  `\\(\\ Граф \\; ${degrees[0]}-регулярный \\; порядка \\; ${degrees.length} \\)`}
              </p>
            </div>
          </MathJax>
        </>
      );
    case 8: {
      let degrees = cyNodes.map((node) => node.degree());
      let cond = degrees.every((degree) => degree === degrees.length - 1);
      return (
        <>
          <MathJax>
            <div>
              <p
                className={s.CenterFormula}
              >{`\\(\\ Последовательность \\; степеней = \\left ( ${degrees} \\right ) \\)`}</p>
            </div>
            <div>
              <p className={s.CenterFormula}>
                {cond &&
                  `\\(\\ Это \\; полный \\; граф \\; (K_{${degrees.length}}) \\)`}
              </p>
            </div>
          </MathJax>
        </>
      );
    }
    case 9: {
      const setA = [];
      const setB = [];
      let isBipartile = true;
      if (cy != null) {
        cy.elements().bfs({
          root: "#0",
          visit: function (v, e, u, i, depth) {
            if (depth % 2) {
              cy.style()
                .selector(`#${v.id()}`)
                .style({ "background-color": "rgb(255, 87, 51)" })
                .update();
              setA.push(v);
            } else {
              cy.style()
                .selector(`#${v.id()}`)
                .style({ "background-color": "rgb(138, 255, 51)" })
                .update();
              setB.push(v);
            }
          },
        });
      }
      if (
        cyEdges.some(
          (e) =>
            e.source().style("background-color") ===
            e.target().style("background-color")
        )
      ) {
        isBipartile = false;
      }
      return (
        <>
          <MathJax>
            {isBipartile ? (
              <>
                <div>
                  <p
                    className={s.CenterFormula}
                  >{`\\(\\ \\text{Set } A = \\{${setA.map(
                    (node, ind) => `v_{${node.id()}}`
                  )}\\} \\)`}</p>
                </div>
                <div>
                  <p className={s.CenterFormula}>
                    {`\\(\\ \\text{Set } B = \\{${setB.map(
                      (node, ind) => `v_{${node.id()}}`
                    )}\\} \\)`}
                  </p>
                </div>
              </>
            ) : (
              <div>
                <p className={s.CenterFormula}>
                  {`\\(\\ \\text{Не двудольный}  \\)`}
                </p>
              </div>
            )}
          </MathJax>
        </>
      );
    }
    case 10: {
      const setA = [];
      const setB = [];
      let isBipartile = true;

      if (cy != null) {
        cy.elements().bfs({
          root: "#0",
          visit: function (v, e, u, i, depth) {
            if (depth % 2) {
              cy.style()
                .selector(`#${v.id()}`)
                .style({ "background-color": "rgb(255, 87, 51)" })
                .update();
              setA.push(v);
            } else {
              cy.style()
                .selector(`#${v.id()}`)
                .style({ "background-color": "rgb(138, 255, 51)" })
                .update();
              setB.push(v);
            }
          },
        });
      }
      if (
        cyEdges.some(
          (e) =>
            e.source().style("background-color") ===
            e.target().style("background-color")
        )
      ) {
        isBipartile = false;
      }
      let cond = setA.length === setB.length;
      let degreeCond = cyNodes.every(
        (node) => node.degree() === cyNodes[0].degree()
      );
      console.log("1");
      return (
        <>
          <MathJax>
            <div>
              <p className={s.CenterFormula}>
                {isBipartile
                  ? cond && degreeCond
                    ? `\\(\\  \\text{Полный двудольный граф (\\(K_{${setA.length},${setB.length}}\\))} \\)`
                    : `\\(\\  \\text{Не полный.} \\)`
                  : `\\(\\ \\text{Не двудольный}  \\)`}
              </p>
            </div>
            <div>
              <p className={s.CenterFormula}>
                {isBipartile
                  ? cond && degreeCond
                    ? `\\(\\ |E|=${setA.length}\\cdot${setB.length}=${
                        setA.length * setB.length
                      }   \\)`
                    : false
                  : false}
              </p>
            </div>
          </MathJax>
        </>
      );
    }
    case 11: {
      let visited = new Set();
      let isCycle = false;
      let isForest = false;
      if (cy !== null) {
        const dfs = function (root, prev) {
          if (root.isEdge()) {
            return false;
          }
          if (root.neighborhood().length === 1) {
            return false;
          }

          if (visited.has(String(root.id()))) {
            return true;
          } else {
            visited.add(String(root.id()));
            for (let node of root.neighborhood()) {
              if (prev !== null && node.id() === prev.id()) {
                continue;
              }
              if (dfs(node, root)) {
                return true;
              }
            }
          }
          return false;
        };
        isCycle = dfs(cyNodes[0], null);
        isForest = cyNodes.some((n) => !visited.has(n.id()));
      }
      return (
        <>
          <MathJax>
            <p className={s.CenterFormula}>
              {!isCycle
                ? isForest
                  ? `\\(\\  \\text{Это лес.} \\)`
                  : `\\(\\  \\text{Это дерево с } |V|=${cyNodes.length}, |E|=${cyEdges.length} \\)`
                : `\\(\\  \\text{Тут есть цикл. Уберите его.} \\)`}
            </p>
          </MathJax>
        </>
      );
    }
    default:
      return null;
  }
};
