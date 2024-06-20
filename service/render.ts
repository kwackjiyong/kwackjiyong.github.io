const render = function() {
    const state = {}
    const action = {
        generateRender: (ctx) => {
            return {
                draw: {
                    circle: (x, y, w) => {
                        ctx.beginPath()
                        ctx.arc(x, y, w, 0, 2 * Math.PI)
                        ctx.fill()
                    },
                    line: (x, y, w, h) => {
                        ctx.beginPath()
                        ctx.moveTo(x, y)
                        ctx.lineTo(w, h)
                        ctx.stroke()
                    },
                    square: (x, y, w, h) => {
                        ctx.beginPath()
                        ctx.fillRect(x, y, w, h)
                    },
                    remove: (x, y, w, h) => {
                        ctx.clearRect(x, y, w, h)
                    },
                    reset: () => {
                        ctx.reset()
                    }
                },
                delete: (ctx, cv) => {
                    return () => {
                        if(cv) {
                            ctx.reset()
                            cv.remove()
                            ctx = null
                            cv = null     
                        } else {
                            throw new DOMException('Not Found Canvas')
                        }
                    }
                },
            }
        },
        /** 
         * render Object init
         * @param el Append Target HTML Element
         * @param w Canvas Width
         * @param h Canvas Height
         */
        init: (el,w,h) => {
            const parent = el || document.body //Target Element
            // init Canvas
            const cv = document.createElement('canvas')
            cv.height = h || parent.getClientRects()[0].height
            cv.width = w || parent.getClientRects()[0].width
            cv.style.width = '100%'
            cv.style.position = 'fixed'
            parent.appendChild(cv)
            // init Context
            const ctx = cv.getContext('2d')
            if(ctx) {
                ctx.lineWidth = 5
                ctx.lineCap = 'round'
                ctx.lineJoin = 'round'
                ctx.font = "20pt '맑은 고딕'"
                ctx.fillStyle = 'black'
            } else {
                return null
            }

            return {
                render: this.generateRender(ctx),
                delete: this.delete(ctx, cv)
            }
        }
    }
}