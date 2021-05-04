<<<<<<< HEAD
var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function o(t){t.forEach(e)}function s(t){return"function"==typeof t}function i(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function c(t,e){t.appendChild(e)}function r(t,e,n){t.insertBefore(e,n||null)}function l(t){t.parentNode.removeChild(t)}function a(t){return document.createElement(t)}function u(){return t=" ",document.createTextNode(t);var t}function h(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function d(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function f(t,e){t.value=null==e?"":e}function p(t,e,n,o){t.style.setProperty(e,n,o?"important":"")}let m;function x(t){m=t}function g(){if(!m)throw new Error("Function called outside component initialization");return m}const $=[],v=[],_=[],y=[],w=Promise.resolve();let b=!1;function P(t){_.push(t)}let C=!1;const E=new Set;function M(){if(!C){C=!0;do{for(let t=0;t<$.length;t+=1){const e=$[t];x(e),k(e.$$)}for(x(null),$.length=0;v.length;)v.pop()();for(let t=0;t<_.length;t+=1){const e=_[t];E.has(e)||(E.add(e),e())}_.length=0}while($.length);for(;y.length;)y.pop()();b=!1,C=!1,E.clear()}}function k(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(P)}}const z=new Set;function j(t,e){t&&t.i&&(z.delete(t),t.i(e))}function A(t,n,i,c){const{fragment:r,on_mount:l,on_destroy:a,after_update:u}=t.$$;r&&r.m(n,i),c||P((()=>{const n=l.map(e).filter(s);a?a.push(...n):o(n),t.$$.on_mount=[]})),u.forEach(P)}function H(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function S(t,e){-1===t.$$.dirty[0]&&($.push(t),b||(b=!0,w.then(M)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function I(e,s,i,c,r,a,u=[-1]){const h=m;x(e);const d=e.$$={fragment:null,ctx:null,props:a,update:t,not_equal:r,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(h?h.$$.context:s.context||[]),callbacks:n(),dirty:u,skip_bound:!1};let f=!1;if(d.ctx=i?i(e,s.props||{},((t,n,...o)=>{const s=o.length?o[0]:n;return d.ctx&&r(d.ctx[t],d.ctx[t]=s)&&(!d.skip_bound&&d.bound[t]&&d.bound[t](s),f&&S(e,t)),n})):[],d.update(),f=!0,o(d.before_update),d.fragment=!!c&&c(d.ctx),s.target){if(s.hydrate){const t=function(t){return Array.from(t.childNodes)}(s.target);d.fragment&&d.fragment.l(t),t.forEach(l)}else d.fragment&&d.fragment.c();s.intro&&j(e.$$.fragment),A(e,s.target,s.anchor,s.customElement),M()}x(h)}class L{$destroy(){H(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const O=10;class q{constructor(t,e,n){this._mousePosition={x:0,y:0},this._pixelObj={pixelX:0,pixelY:0,pixelColor:""},this._canvas=t,this._mousePositionText=e,this._context=t.getContext("2d"),this._data=[...Array(t.width)].map((e=>Array(t.height).fill([255,255,255,255]))),t.addEventListener("click",(t=>{n=this._pixelColor,this.mouseMovedInCanvas(t),this.draw(this._mousePosition.x,this._mousePosition.y,n),this._publicMousePosition={x:this._mousePosition.x,y:this._mousePosition.y}})),t.addEventListener("mousemove",(t=>{this.mouseMovedInCanvas(t),this._mousePositionText.textContent=`x: ${this._mousePosition.x}, y: ${this._mousePosition.y}`})),this.loadImage()}savePixel(t){return this._pixelObj={pixelX:this._publicMousePosition.x,pixelY:this._publicMousePosition.y,pixelColor:t}}loadImage(){const t=new Image;t.src="/images/cat2.png";const e=this;t.onload=()=>{e._context.canvas.width=t.width,e._context.canvas.height=t.height,e._context.drawImage(t,0,0,t.width,t.height)}}draw(t,e,n){this.setColor(n),t>=0&&t<this._canvas.width&&e>=0&&e<this._canvas.height&&this._context.fillRect(t*O,e*O,O,O)}setColor(t){this._context.fillStyle=`rgba(${t[0]},${t[1]},${t[2]},${t[3]})`}mouseMovedInCanvas(t){const e=this._canvas.getBoundingClientRect();let n=t.clientX-e.left,o=t.clientY-e.top;n=Math.floor(this._canvas.width*n/this._canvas.clientWidth),o=Math.floor(this._canvas.height*o/this._canvas.clientHeight);const s=Math.floor(n/O),i=Math.floor(o/O);this._mousePosition={x:s,y:i}}}const N="http://localhost:8084";class R{serverStatus(){const t=new XMLHttpRequest;t.open("get",`${N}/status`),t.send()}sendPixel(t){const e=new XMLHttpRequest;e.open("post",`${N}/sendNewPixel`),e.setRequestHeader("Content-type","application/json"),e.send(JSON.stringify(t))}getPixels(){const t=new XMLHttpRequest;t.open("get",`${N}/getStoredPixels`),t.responseType="json",t.onload=function(){t.readyState===t.DONE&&200===t.status&&(console.log("Firmas"),console.log(t.response.values))},t.send()}}function X(e){let n,s,i,m,x,g,$,v,_,y,w,b,P,C,E,M,k;return{c(){n=a("main"),s=a("div"),i=a("p"),i.textContent="Select a color",m=u(),x=a("p"),x.textContent="x: 0, y: 0",g=u(),$=a("input"),v=u(),_=a("div"),y=a("div"),w=a("canvas"),b=u(),P=a("button"),P.textContent="Enviar solicitud para modificar",C=u(),E=a("button"),E.textContent="Actualizar obra",d(i,"class","svelte-1wzno3h"),d(x,"id","cursorPosition"),d(x,"class","svelte-1wzno3h"),d($,"type","color"),p($,"height","50px"),d(w,"width","300px"),d(w,"height","300px"),d(w,"class","svelte-1wzno3h"),p(y,"--theme-color",e[2]),d(y,"class","svelte-1wzno3h"),d(_,"class","svelte-1wzno3h"),d(P,"class","button buttonHover svelte-1wzno3h"),d(E,"class","button buttonHover svelte-1wzno3h"),d(s,"class","hero svelte-1wzno3h"),d(n,"id","test")},m(t,o){r(t,n,o),c(n,s),c(s,i),c(s,m),c(s,x),e[5](x),c(s,g),c(s,$),f($,e[2]),c(s,v),c(s,_),c(_,y),c(y,w),e[7](w),c(s,b),c(s,P),c(s,C),c(s,E),M||(k=[h($,"input",e[6]),h(P,"click",e[3]),h(E,"click",e[4])],M=!0)},p(t,[e]){4&e&&f($,t[2]),4&e&&p(y,"--theme-color",t[2])},i:t,o:t,d(t){t&&l(n),e[5](null),e[7](null),M=!1,o(k)}}}function T(t){let e=[];var n;if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(t))return 3==(n=t.substring(1).split("")).length&&(n=[n[0],n[0],n[1],n[1],n[2],n[2]]),n="0x"+n.join(""),e.push(n>>16&255),e.push(n>>8&255),e.push(255&n),e.push(1),e;throw new Error("Bad Hex")}function B(t,e,n){let o,s,i,c="#5c3838",r=[];const l=new R;var a;return a=()=>{i=new q(o,s,r)},g().$$.on_mount.push(a),function(t){g().$$.after_update.push(t)}((()=>{r=T(c),i._pixelColor=r})),[o,s,c,function(){i&&(console.log(i.savePixel(T(c))),console.log(T(c)),console.log(c),l.sendPixel(i.savePixel(T(c))))},function(){i&&l.getPixels()},function(t){v[t?"unshift":"push"]((()=>{s=t,n(1,s)}))},function(){c=this.value,n(2,c)},function(t){v[t?"unshift":"push"]((()=>{o=t,n(0,o)}))}]}class F extends L{constructor(t){super(),I(this,t,B,X,i,{})}}function Y(e){let n,o,s,i,h;return i=new F({}),{c(){var t;n=a("main"),o=a("h1"),o.textContent="Project Pixel",s=u(),(t=i.$$.fragment)&&t.c(),d(o,"class","svelte-sq2aix"),d(n,"id","test")},m(t,e){r(t,n,e),c(n,o),c(n,s),A(i,n,null),h=!0},p:t,i(t){h||(j(i.$$.fragment,t),h=!0)},o(t){!function(t,e,n,o){if(t&&t.o){if(z.has(t))return;z.add(t),(void 0).c.push((()=>{z.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}}(i.$$.fragment,t),h=!1},d(t){t&&l(n),H(i)}}}return new class extends L{constructor(t){super(),I(this,t,null,Y,i,{})}}({target:document.body})}();
=======

(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function beforeUpdate(fn) {
        get_current_component().$$.before_update.push(fn);
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function afterUpdate(fn) {
        get_current_component().$$.after_update.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : options.context || []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.37.0' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const BRUSH_SIZE = 10;
    class Canvas {
        constructor(canvas, cursorPosition, color) {
            this._mousePosition = { x: 0, y: 0 };
            this._pixelObj = { pixelX: 0, pixelY: 0, pixelColor: '' };
            this._canvas = canvas;
            this._mousePositionText = cursorPosition;
            this._context = canvas.getContext("2d");
            this._data = [...Array(canvas.width)].map((value) => Array(canvas.height).fill([255, 255, 255, 255]));
            canvas.addEventListener("click", (event) => {
                color = this._pixelColor;
                this.mouseMovedInCanvas(event);
                this.draw(this._mousePosition.x, this._mousePosition.y, color);
                this._publicMousePosition = { x: this._mousePosition.x, y: this._mousePosition.y };
            });
            canvas.addEventListener('mousemove', (event) => {
                this.mouseMovedInCanvas(event);
                this._mousePositionText.textContent = `x: ${this._mousePosition.x}, y: ${this._mousePosition.y}`;
            });
            this.loadImage();
        }
        // Create the object with position x, y and color.
        savePixel(color) {
            return this._pixelObj = {
                pixelX: this._publicMousePosition.x,
                pixelY: this._publicMousePosition.y,
                pixelColor: color,
            };
        }
        loadImage() {
            const image = new Image();
            image.src = "/images/cat2.png";
            const _this = this;
            image.onload = () => {
                _this._context.canvas.width = image.width;
                _this._context.canvas.height = image.height;
                _this._context.drawImage(image, 0, 0, image.width, image.height);
            };
        }
        draw(x, y, color) {
            this.setColor(color);
            if (x >= 0 && x < this._canvas.width && y >= 0 && y < this._canvas.height) {
                this._context.fillRect(x * BRUSH_SIZE, y * BRUSH_SIZE, BRUSH_SIZE, BRUSH_SIZE);
            }
        }
        setColor(color) {
            // this._context.fillStyle = color    
            this._context.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${color[3]})`;
        }
        mouseMovedInCanvas(event) {
            const bounds = this._canvas.getBoundingClientRect();
            let x = event.clientX - bounds.left;
            let y = event.clientY - bounds.top;
            x = Math.floor((this._canvas.width * x) / this._canvas.clientWidth);
            y = Math.floor((this._canvas.height * y) / this._canvas.clientHeight);
            const xPosition = Math.floor(x / BRUSH_SIZE);
            const yPosition = Math.floor(y / BRUSH_SIZE);
            this._mousePosition = { x: xPosition, y: yPosition };
        }
    }

    const SERVER_URL = 'http://localhost:8081';
    class Network {
        serverStatus() {
            const request = new XMLHttpRequest();
            request.open('get', `${SERVER_URL}/status`);
            request.send();
        }
        sendPixel(pixelObj) {
            const request = new XMLHttpRequest();
            request.open('post', `${SERVER_URL}/sendNewPixel`);
            request.setRequestHeader("Content-type", "application/json");
            request.send(JSON.stringify(pixelObj));
        }
    }

    /* src\components\Canvas.svelte generated by Svelte v3.37.0 */

    const { Error: Error_1, console: console_1 } = globals;
    const file$1 = "src\\components\\Canvas.svelte";

    function create_fragment$1(ctx) {
    	let main;
    	let div2;
    	let p0;
    	let t1;
    	let p1;
    	let t3;
    	let input;
    	let t4;
    	let div1;
    	let div0;
    	let canvas_1;
    	let t5;
    	let button0;
    	let t7;
    	let button1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			main = element("main");
    			div2 = element("div");
    			p0 = element("p");
    			p0.textContent = "Select a color";
    			t1 = space();
    			p1 = element("p");
    			p1.textContent = "x: 0, y: 0";
    			t3 = space();
    			input = element("input");
    			t4 = space();
    			div1 = element("div");
    			div0 = element("div");
    			canvas_1 = element("canvas");
    			t5 = space();
    			button0 = element("button");
    			button0.textContent = "Enviar solicitud para modificar";
    			t7 = space();
    			button1 = element("button");
    			button1.textContent = "Actualizar obra";
    			attr_dev(p0, "class", "svelte-11dun7s");
    			add_location(p0, file$1, 72, 4, 2821);
    			attr_dev(p1, "id", "cursorPosition");
    			attr_dev(p1, "class", "svelte-11dun7s");
    			add_location(p1, file$1, 73, 4, 2848);
    			attr_dev(input, "type", "color");
    			set_style(input, "height", "50px");
    			add_location(input, file$1, 74, 4, 2918);
    			attr_dev(canvas_1, "width", "300px");
    			attr_dev(canvas_1, "height", "300px");
    			attr_dev(canvas_1, "class", "svelte-11dun7s");
    			add_location(canvas_1, file$1, 77, 8, 3046);
    			set_style(div0, "--theme-color", /*color*/ ctx[2]);
    			attr_dev(div0, "class", "svelte-11dun7s");
    			add_location(div0, file$1, 76, 6, 3000);
    			attr_dev(div1, "class", "svelte-11dun7s");
    			add_location(div1, file$1, 75, 4, 2987);
    			attr_dev(button0, "class", "button buttonHover svelte-11dun7s");
    			add_location(button0, file$1, 80, 4, 3136);
    			attr_dev(button1, "class", "button buttonHover svelte-11dun7s");
    			add_location(button1, file$1, 83, 4, 3258);
    			attr_dev(div2, "class", "hero svelte-11dun7s");
    			add_location(div2, file$1, 71, 2, 2797);
    			attr_dev(main, "id", "test");
    			add_location(main, file$1, 70, 0, 2777);
    		},
    		l: function claim(nodes) {
    			throw new Error_1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div2);
    			append_dev(div2, p0);
    			append_dev(div2, t1);
    			append_dev(div2, p1);
    			/*p1_binding*/ ctx[4](p1);
    			append_dev(div2, t3);
    			append_dev(div2, input);
    			set_input_value(input, /*color*/ ctx[2]);
    			append_dev(div2, t4);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			append_dev(div0, canvas_1);
    			/*canvas_1_binding*/ ctx[6](canvas_1);
    			append_dev(div2, t5);
    			append_dev(div2, button0);
    			append_dev(div2, t7);
    			append_dev(div2, button1);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "input", /*input_input_handler*/ ctx[5]),
    					listen_dev(button0, "click", /*createPixelInfo*/ ctx[3], false, false, false),
    					listen_dev(button1, "click", updatePixelArt, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*color*/ 4) {
    				set_input_value(input, /*color*/ ctx[2]);
    			}

    			if (dirty & /*color*/ 4) {
    				set_style(div0, "--theme-color", /*color*/ ctx[2]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			/*p1_binding*/ ctx[4](null);
    			/*canvas_1_binding*/ ctx[6](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function updatePixelArt() {
    	
    }

    //Función para convertir color HEX a rgba
    function hexToRGB(hex) {
    	let rgba = [];
    	var c;

    	if ((/^#([A-Fa-f0-9]{3}){1,2}$/).test(hex)) {
    		c = hex.substring(1).split("");

    		if (c.length == 3) {
    			c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    		}

    		c = "0x" + c.join("");
    		rgba.push(c >> 16 & 255);
    		rgba.push(c >> 8 & 255);
    		rgba.push(c & 255);
    		rgba.push(1);

    		// return "[" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") + ",1]";
    		return rgba;
    	}

    	throw new Error("Bad Hex");
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Canvas", slots, []);

    	var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
    		function adopt(value) {
    			return value instanceof P
    			? value
    			: new P(function (resolve) {
    						resolve(value);
    					});
    		}

    		return new (P || (P = Promise))(function (resolve, reject) {
    				function fulfilled(value) {
    					try {
    						step(generator.next(value));
    					} catch(e) {
    						reject(e);
    					}
    				}

    				function rejected(value) {
    					try {
    						step(generator["throw"](value));
    					} catch(e) {
    						reject(e);
    					}
    				}

    				function step(result) {
    					result.done
    					? resolve(result.value)
    					: adopt(result.value).then(fulfilled, rejected);
    				}

    				step((generator = generator.apply(thisArg, _arguments || [])).next());
    			});
    	};

    	let canvas;
    	let cursorPosition;
    	let canvasWrapper;
    	let color = "#5c3838";
    	let colorArray = [];
    	let pixels = [];
    	const network = new Network();

    	// onMount(() => {
    	//   network.getPixels();
    	//   canvasWrapper = new Canvas(canvas, cursorPosition, colorArray);
    	// });
    	onMount(() => __awaiter(void 0, void 0, void 0, function* () {
    		canvasWrapper = new Canvas(canvas, cursorPosition, colorArray);
    		const res = yield fetch(`${SERVER_URL}/getStoredPixels`);
    		pixels = yield res.json();
    		console.log(pixels.values);

    		for (let i = 0; i < pixels.values.length; i++) {
    			canvasWrapper.draw(pixels.values[i].pixelX, pixels.values[i].pixelY, [
    				pixels.values[i].r,
    				pixels.values[i].g,
    				pixels.values[i].b,
    				pixels.values[i].a
    			]);
    		}
    	}));

    	//After every update, the color is set by the color from the input
    	afterUpdate(() => {
    		colorArray = hexToRGB(color);
    		canvasWrapper._pixelColor = colorArray;
    	});

    	function createPixelInfo() {
    		if (canvasWrapper) {
    			console.log(canvasWrapper.savePixel(hexToRGB(color)));
    			console.log(hexToRGB(color));
    			console.log(color);
    			network.sendPixel(canvasWrapper.savePixel(hexToRGB(color)));
    		}
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<Canvas> was created with unknown prop '${key}'`);
    	});

    	function p1_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			cursorPosition = $$value;
    			$$invalidate(1, cursorPosition);
    		});
    	}

    	function input_input_handler() {
    		color = this.value;
    		$$invalidate(2, color);
    	}

    	function canvas_1_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			canvas = $$value;
    			$$invalidate(0, canvas);
    		});
    	}

    	$$self.$capture_state = () => ({
    		__awaiter,
    		beforeUpdate,
    		onMount,
    		afterUpdate,
    		Canvas,
    		Network,
    		SERVER_URL,
    		canvas,
    		cursorPosition,
    		canvasWrapper,
    		color,
    		colorArray,
    		pixels,
    		network,
    		createPixelInfo,
    		updatePixelArt,
    		hexToRGB
    	});

    	$$self.$inject_state = $$props => {
    		if ("__awaiter" in $$props) __awaiter = $$props.__awaiter;
    		if ("canvas" in $$props) $$invalidate(0, canvas = $$props.canvas);
    		if ("cursorPosition" in $$props) $$invalidate(1, cursorPosition = $$props.cursorPosition);
    		if ("canvasWrapper" in $$props) canvasWrapper = $$props.canvasWrapper;
    		if ("color" in $$props) $$invalidate(2, color = $$props.color);
    		if ("colorArray" in $$props) colorArray = $$props.colorArray;
    		if ("pixels" in $$props) pixels = $$props.pixels;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		canvas,
    		cursorPosition,
    		color,
    		createPixelInfo,
    		p1_binding,
    		input_input_handler,
    		canvas_1_binding
    	];
    }

    class Canvas_1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Canvas_1",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.37.0 */
    const file = "src\\App.svelte";

    function create_fragment(ctx) {
    	let main;
    	let h1;
    	let t1;
    	let canvas;
    	let current;
    	canvas = new Canvas_1({ $$inline: true });

    	const block = {
    		c: function create() {
    			main = element("main");
    			h1 = element("h1");
    			h1.textContent = "Project Pixel";
    			t1 = space();
    			create_component(canvas.$$.fragment);
    			attr_dev(h1, "class", "svelte-sq2aix");
    			add_location(h1, file, 4, 2, 101);
    			attr_dev(main, "id", "test");
    			add_location(main, file, 3, 0, 81);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, h1);
    			append_dev(main, t1);
    			mount_component(canvas, main, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(canvas.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(canvas.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(canvas);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("App", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Canvas: Canvas_1 });
    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
        target: document.body,
    });

    return app;

}());
>>>>>>> 578212f089cf9c27b2e87ffb7235d4a765702a77
//# sourceMappingURL=bundle.js.map
