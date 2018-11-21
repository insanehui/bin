/*
 * 同步utils
 */
const path = require('path')
const d = path.resolve.bind(null, __dirname)
const _ = require('lodash')
const chalk = require('chalk')
const shell = require('shelljs')

function copy(from, to, list) {
  for (const file of list) {
    console.log(`processing ${file}...`)
    shell.exec(`sync-code ${d(from, file)} ${d(to, file)}`)
  }
}

function main() {
  const _src_ = 'C:/Users/guanghui/js_utils'

  copy(_src_, '../src/utils', [
    'web/readFileDialog.js',
    'components/Prompt.js',
    'components/Dialog/popup.js',
    'components/utils/injectProps.js',
    'web/icon',
    'components/Dialog/Dialog.js',
    'components/Dialog/UIKit.js',
    'components/Draggable/Basic.js',
    'components/utils/injectChildren.js',
    'components/FakeProgressBar/FakeProgressBar.js',
    'rxjs/windowEvent.js',
    'components/Resizable/Resizable.js',
    'components/Resizable.js',
    'rxjs/drag.js',
    'rxjs/operators',
    'components/Editable2.js',
    'browser.js',
    'react-dom-attrs',
    'components/BImg.js',
    'components/Iconfont.js',
    'components/Formy/adaptor.js',
    'components/Textarea.js',
    'components/Formy/bindState.js',
    'components/ThemeCTG.js',
    'components/ThemeGitHub.js',
    'web/preset.css',
    'web/is_dev.js',
    'components/sheeter.js',
    'components/displayName/hoc.js',
    'keycode.js',
    'components/Sortable.js',
    'components/utils/enumEvents/index.js',
    'components/utils/forward.js',
    'modash/merge.js',
    'modash/bind.js',
    'components/Formy/uncontrolled.js',
    'components/Formy/Form/wrapChild.js',
    'components/Sticker.js',
    'cssobj.js',
    'css_preset.js',
    'fetch.js',
    'modash.js',
    'adjust.js',
    'query_string_para.js',
    'redux.js',
    'redux_middleware.js',
    'uniquer.js',
    'web/webpack_node_env.js',
    'components/utils.js',
    'components/displayName/get.js',
    'components/ActiveStyle.js',
    'components/ActiveX.js',
    'components/Form.js',
    'components/ThemeNutanix.js',
    'components/Insertable.js',
    'components/Active.js',
    'components/Toggle.js',
    'components/img.js',
    'components/Handling.js',
    'components/Formy/Form.js',
    'components/CheckboxSelect.js',
    'components/Ellipsis.js',
    'components/Flex.js',
    'components/window/ScrollSensor.js',
    'components/window/scrollToTop.js',
  ])

  copy(_src_, '../../svr/builder/utils', [
    'modash.js',
    'counter.js',
    'js_escape.js',
    'expire.js',
    'fetch.js',
    'node/args.js',
    'node/tempCd.js',
    'node/cmd_line.js',
    'node/koa_logger.js',
    'node/koa_para.js',
  ])

  // copy(d('../src/'), '../../svr/builder/', [ // 用于isomophism
  //   'iso.js',
  // ])

  console.log(chalk.cyan('premake done'))
}

main()

