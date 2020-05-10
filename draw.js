let free = document.getElementById("free_hand")
let line = document.getElementById("line")
let circle = document.getElementById("circle")
let rect = document.getElementById("rectangle")
let erase = document.getElementById("erase")

let fill_color = document.getElementById("fill_color")
let fill_stroke = document.getElementById("fill_stroke")

let canvas = document.getElementById("my_canvas")
let ctx = canvas.getContext('2d')
let current_button

fill_color.addEventListener("change", function (e) {
    ctx.fillStyle = e.target.value
})
fill_stroke.addEventListener("change", function (e) {
    ctx.strokeStyle = e.target.value
})

line.addEventListener("click", function (e) {
    current_button = e.target.id
    let start_point = { x: 0, y: 0 }
    canvas.addEventListener("mousedown", function (e) {
        if (current_button === line.id) {
            start_point.x = e.offsetX
            start_point.y = e.offsetY
            ctx.beginPath()
            ctx.moveTo(start_point.x, start_point.y)
        }
    })
    canvas.addEventListener("mouseup", function (e) {
        if (current_button === line.id) {
            ctx.lineTo(e.offsetX, e.offsetY)
            ctx.stroke()
        }
    })
})
rect.addEventListener("click", function (e) {
    current_button = e.target.id
    let start_point = { x: 0, y: 0 }
    canvas.addEventListener("mousedown", function (e) {
        if (current_button === rect.id) {

            start_point.x = e.offsetX
            start_point.y = e.offsetY
            ctx.beginPath()
            ctx.moveTo(start_point.x, start_point.y)
        }
    })
    canvas.addEventListener("mouseup", function (e) {
        if (current_button === rect.id) {

            ctx.fillRect(start_point.x, start_point.y, e.offsetX-start_point.x, e.offsetY-start_point.y)
            ctx.strokeRect(start_point.x, start_point.y, e.offsetX-start_point.x, e.offsetY-start_point.y)
        }
    })
})
circle.addEventListener("click", function (e) {
    current_button = e.target.id
    let start_point = { x: 0, y: 0 }
    let radius = 0

    canvas.addEventListener("mousedown", function (e) {
        if (current_button === circle.id) {
            start_point.x = e.offsetX
            start_point.y = e.offsetY
            ctx.beginPath()
            ctx.moveTo(start_point.x, start_point.y)
        }
    })
    canvas.addEventListener("mouseup", function (e) {
        if (current_button === circle.id) {
            let deltaX = start_point.x - e.offsetX
            let deltaY = start_point.y - e.offsetY
            radius = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
            ctx.arc(start_point.x, start_point.y, radius, 0, Math.PI * 2)
            ctx.fill()
            ctx.stroke()
        }
    })
})
erase.addEventListener("click", function (e) {
    ctx.clearRect(0, 0, 800, 500);
})
free.addEventListener("click", function (e) {
    current_button = e.target.id
    let start_point = { x: 0, y: 0 }
    let draw = 0
    canvas.addEventListener("mousedown", function (e) {
        if (current_button === free.id) {
            if (draw == 0) {
                draw = 1
                start_point.x = e.offsetX
                start_point.y = e.offsetY
                ctx.beginPath()
                ctx.moveTo(start_point.x, start_point.y)
            } else {
                draw = 0
            }
        }
    })
    canvas.addEventListener("mousemove", function (e) {
        if (current_button === free.id) {
            console.log("moving");
            if (draw == 1) {
                ctx.lineTo(e.offsetX, e.offsetY)
                ctx.stroke()
            }
        }
    })
})
