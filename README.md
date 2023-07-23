## Non Maximum Suppression with Javascript

Examples of Non Maximum Suppression with Javascript:
- [fast nms](./fast-nms.js)
- [recursive NMS](./recursive-nms.js)

Recursive NMS works well with static entities (i. e. feature detection on a static image), but does not work well for dynamic cases (feature detection in a video stream) since it uses recursion.

Fast NMS solves the issue, however the results are not as good as in recursive implementation.

### Implementations

Fast NMS is implemented and used here: https://github.com/peterdee/fast-camera/blob/release/src/fast-canvas/nms.ts

Recursive NMS is also implemented in Golang here: https://github.com/peterdee/go-fast/blob/release/nms.go

### License

[MIT](LICENSE.md)
