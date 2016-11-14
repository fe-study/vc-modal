<h1 align="center">vc-modal - @changelog</h1>

## 0.4.0

`2016-11-14`

- 修复 `zoom` 模式下垂直居中问题(增加了 `modal-center` class的标识)

## 0.3.0

`2016-09-27`

- 去除 `center` 模式下的padding，使得模态框不至于在距离顶部20px就消失，闪出...

- 去除了modal-content同级的默认slot,会导致插入具名slot有问题，忍痛抛弃...
  - 这样做一些效果就可能需要手动将.modal-content的padding置为0
  - 记得将类似slot="modal-body"的class也设置为modal-body，来获得padding，当然也可以自定义，目前就是slot完全包裹容器替换

## 0.2.1

`2016-09-24`

- 新增 `top`, `center`, `maskCloseable` 属性，用于实现水平垂直居中，控制顶高，遮罩区点击是否可隐藏模态框
  - 默认模态框距离顶部 `30px`, 靠 `margin: 30px auto` 实现
  - 一旦 `top` prop 非空，就清除 `margin`
  - 反之，`top` 为空，则加上默认margin

- `center` 优先级大于 `top`，一旦设置`center: true`, 则清空 `top`
  - 动态计算top值实现

- 实现 `backdrop` 属性，无遮罩效果，自然也无法点击空白消失

## 0.1.1

`2016-09-21`

- 新增默认(default) `slot` 仅仅利用modal的展示和动画能力
- 默认 `effect` 被预设为 `fade`

## 0.1.0

`2016-08-24`

- 增加 `okText`, `noText`, `onConfirm` props
- 改进, 通过监听 `transitionend` 来做相应DOM操作
- 解决modal出现的页面抖动，增加计算滚动条宽度的方法
- 增加 `beforeDestroy` hook方法，防止modal被剔除DOM时监听器未被移除

## 0.0.1

`2016-05-08`

- init

