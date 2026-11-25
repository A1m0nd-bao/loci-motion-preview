道具数量动效 · Lifecycle Link

预览
双击「道具数量动效.html」即可离线打开，无需安装依赖。
两枚卡片各有独立数量输入框与应用按钮，可分别设置蓝色、红色道具数量。
每枚卡片的加减按钮仅修改对应道具，下方实际尺寸预览同步更新。
下方公共工具栏保留同步演示、应用到两枚、跨位数场景、连续点击和半速预览。
下方是实际尺寸，上方为 2.6 倍细节预览。

交互
数量增加：数字向上滚动；数量减少：数字向下滚动。
数字按个位、十位、百位分别滚动，未变化的位保持稳定。
位数增加时外框展开，位数减少时外框收拢，带轻微回弹。
框高 36px，圆角 18px；左侧原始图案固定为 18 × 20px。
初始 200 的胶囊宽 76px；初始 0 的胶囊宽约 59px。
新增了图案轻微弹动和同色边缘反馈。

网页接入
将 item-counter.js 引入页面，然后使用：

<script src="./item-counter.js"></script>
<item-counter id="blue-count" value="200" label="蓝色道具"></item-counter>
<item-counter id="pink-count" theme="pink" value="0" label="红色道具"></item-counter>

更新数量：
const counter = document.querySelector('#blue-count');
counter.value = 1000;

需要等待数字落定：
await counter.setValue(1000);

首次同步数据，不播放动画：
await counter.setValue(200, { immediate: true });

监听动画完成：
counter.addEventListener('counter-settled', event => {
  console.log(event.detail.value);
});

调整速度：
counter.setAttribute('duration-scale', '2');
默认时长约 460ms；2 表示放慢到约 920ms。

数值规则
支持 0—999999999 的整数，负数归零，超出上限取上限。
快速更新时完成当前滚动，再合并滚动到最新数值。
减少动态效果系统设置开启时直接更新数量，不播放位移动画。
只读 .value 为最新目标数量，.displayedValue 为已完成显示的数量。

文件
道具数量动效.html：可离线预览的单文件。
item-counter.js：可复用 Web Component，已内嵌两枚原始道具图案。
assets：144 × 160px 无损 WebP 图案，支持 8 倍于实际尺寸的显示。
压缩版保留独立数值控制和全部动效；原始 SVG 保留于上一版目录。

验证
在本机 Chrome 中检查跨位数增减、连续点击、指定数量、暂停与还原。
检查桌面 1080 × 850 和手机宽 390px；检查 9 位数上限和减少动态效果设置。
未验证 Safari、Firefox 和原生 App 容器。
