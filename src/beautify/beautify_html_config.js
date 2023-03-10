const opts       = {}
opts.indent_size = 2 // 缩进
// opts.indent_char = opts.indent_size == 1 ? '\t' : ' ' // 缩进用什么, tab 或者 空格
// // max-preserve-newlines
// // <option value="-1">删除所有多余的换行符</option>
// // <option value="1">允许标记之间1个换行符</option>
// // <option value="2">允许标记之间2个换行符</option>
// // <option value="5">允许标记之间5个换行符</option>
// // <option value="10">允许标记之间10个换行符</option>
// // <option value="0">允许标记之间无限个换行符</option>
// opts.max_preserve_newlines = 1
opts.max_preserve_newlines = 1
// opts.preserve_newlines      = opts.max_preserve_newlines !== '-1'
// opts.keep_array_indentation = false // 保持数组缩排
// opts.break_chained_methods  = false // 链式方法调用换行？
// // HTML <style>, <script> 格式化:
// // <select id="indent-scripts">
// // <option value="keep">保持标签的缩进级别</option>
// // <option value="normal">添加一个缩进级别</option>
// // <option value="separate">分离缩排</option>
// opts.indent_scripts = 'normal'
// // <select id="brace-style">
// //  <option value="collapse">用括号控制语句</option>
// //  <option value="expand">括号在本行</option>
// //  <option value="end-expand">结束括号在本行</option>
// // </select>
// opts.brace_style              = 'collapse'
// // 条件语句的前空格: "if(x)" / "if (x)"
// opts.space_before_conditional = true
// // encode编码，例如 \xNN 或 \uNNNN?
// opts.unescape_strings         = false
// // <select name="wrap-line-length" id="wrap-line-length">
// // <option value="0">不要换行</option>
// //   <option value="40">近40个字符换行</option>
// //   <option value="70">近70个字符换行</option>
// //   <option value="80">近80个字符换行</option>
// //   <option value="110">近110个字符换行</option>
// //   <option value="120">近120个字符换行</option>
// //   <option value="160">近160个字符换行</option>
// // </select>
// opts.wrap_line_length          = 0
// opts.space_after_anon_function = true

module.exports = opts
