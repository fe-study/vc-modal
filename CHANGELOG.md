<h1 align="center">vc-modal - @changelog</h1>

## 0.2.0

`2016-09-24`

- 新增 `top`, `center`, `maskCloseable` 属性，用于实现水平垂直居中，控制顶高，遮罩区点击是否可隐藏模态框
  - 默认模态框距离顶部 `30px`, 靠 `margin: 30px auto` 实现
  - 一旦 `top` prop 非空，就清除 `margin`
  - 反之，`top` 为空，则加上默认margin

- `center` 优先级大于 `top`，一旦设置`center: true`, 则清空 `top`
  - 动态计算top值实现

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

