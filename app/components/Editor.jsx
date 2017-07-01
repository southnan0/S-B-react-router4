import React from 'react';
import {Button} from 'antd';

export class Editor extends React.Component {

    static defaultProps = {
        id: 'editor' + parseInt((Math.random() * 100000), 10)
    };

    componentDidMount() {
        let {id, content} = this.props;
        require.ensure([], require => {
            const wangEditor = require('wangeditor');
            this.editor = new wangEditor(id);
            this.editor.config.uploadImgUrl = '/upload';
            this.editor.config.menus = [
                'bold',
                'underline',
                'strikethrough',
                'eraser',
                'bgcolor',
                'quote',
                'fontfamily',
                'fontsize',
                'img'
            ];
            this.editor.create();
            this.editor.$txt.html(content);
        });
    }

    getContent(e) {
        e.preventDefault();
        var content = this.editor.$txt.html();
        let state = this.props.handleSend(content);
        if (state) {
            this.editor.$txt.html(this.props.content);
        }
    }

    handleKeyDown(e) {
        if (e.keyCode === 13 && e.ctrlKey) {
            this.getContent(e);
        }
    }

    render() {
        // 编辑器样式
        const style = {
            width: '100%',
            height: '200px'
        };
        return (
            <div onKeyDown={this.handleKeyDown.bind(this)}>
                <div id={this.props.id} style={style} contentEditable="true"></div>
                <Button className="send-btn" type="button"
                        onClick={this.getContent.bind(this)}> （ctrl+enter）发送 </Button>
            </div>
        );
    }
}
