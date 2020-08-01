"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("reflect-metadata");

var _typeorm = require("typeorm");

var _User = require("./entity/User");

var _Post = require("./entity/Post");

var _Comment = require("./entity/Comment");

(0, _typeorm.createConnection)().then( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(connection) {
    var _yield$connection, manager, u1, p1, c1;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return connection;

          case 2:
            _yield$connection = _context.sent;
            manager = _yield$connection.manager;
            // 创建User 1
            u1 = new _User.User();
            u1.username = 'frank';
            u1.passwordDigest = 'xxx';
            _context.next = 9;
            return manager.save(u1);

          case 9:
            // 创建 post 1
            p1 = new _Post.Post();
            p1.title = 'Post 1';
            p1.content = 'My first post';
            p1.author = u1;
            _context.next = 15;
            return manager.save(p1);

          case 15:
            // 创建comment 1
            c1 = new _Comment.Comment();
            c1.user = u1;
            c1.post = p1;
            c1.content = 'Awesome!';
            _context.next = 21;
            return manager.save(c1);

          case 21:
            console.log(u1.id);
            connection.close();

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}())["catch"](function (error) {
  return console.log(error);
});