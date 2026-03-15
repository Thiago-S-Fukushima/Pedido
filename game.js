const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const player = {
x: canvas.width / 2,
y: canvas.height - 120,
width: 40,
height: 60
}

let hearts = []
let finalHearts = []
let score = 0
let gameState = "playing"

let stars = []

for(let i = 0; i < 100; i++){
stars.push({
x: Math.random() * canvas.width,
y: Math.random() * canvas.height,
speed: Math.random() * 2 + 1
})
}

function spawnHeart(){

const heart = {
x: Math.random() * canvas.width,
y: -20,
size: 30,
speed: 3
}

hearts.push(heart)

}

setInterval(spawnHeart,1000)

function drawPlayer(){

ctx.strokeStyle = "white"
ctx.lineWidth = 3

ctx.beginPath()

ctx.moveTo(player.x + player.width/2, player.y) // ponta
ctx.lineTo(player.x, player.y + player.height) // esquerda
ctx.lineTo(player.x + player.width/2, player.y + player.height - 15) // centro
ctx.lineTo(player.x + player.width, player.y + player.height) // direita
ctx.closePath()

ctx.stroke()

}

function drawHearts(){

ctx.font = "30px Arial"

for(let heart of hearts){
ctx.fillText("❤️",heart.x,heart.y)
}

}

function updateHearts(){

for(let heart of hearts){
heart.y += heart.speed
}

}

function checkCollision(){

for(let i = hearts.length - 1; i >= 0; i--){

let heart = hearts[i]

if(
player.x < heart.x + heart.size &&
player.x + player.width > heart.x &&
player.y < heart.y + heart.size &&
player.y + player.height > heart.y
){

hearts.splice(i,1)
score++

if(score >= 20){
startFinalEffect()
}

}

}

}

function drawScore(){

ctx.fillStyle = "white"
ctx.font = "30px Arial"
ctx.fillText("Corações: " + score,20,40)

}

function updateStars(){

for(let star of stars){

star.y += star.speed

if(star.y > canvas.height){
star.y = 0
star.x = Math.random() * canvas.width
}

}

}

function drawStars(){

ctx.fillStyle = "white"

for(let star of stars){
ctx.fillRect(star.x,star.y,2,2)
}

}

function startFinalEffect(){

gameState = "final"

for(let i = 0; i < 100; i++){

finalHearts.push({
x: Math.random() * canvas.width,
y: Math.random() * canvas.height,
speed: Math.random() * 3 + 1
})

}

}

function updateFinalHearts(){

for(let heart of finalHearts){

heart.y += heart.speed

if(heart.y > canvas.height){
heart.y = 0
heart.x = Math.random() * canvas.width
}

}

}

function drawFinalHearts(){

ctx.font = "40px Arial"

for(let heart of finalHearts){
ctx.fillText("❤️",heart.x,heart.y)
}

}

function drawFinalMessage(){

ctx.fillStyle = "white"
ctx.font = "60px Arial"
ctx.textAlign = "center"

ctx.fillText("Quer se casar comigo? 💍",canvas.width/2,canvas.height/2)

}

canvas.addEventListener("touchstart",function(event){

const touchX = event.touches[0].clientX

if(touchX < canvas.width / 2){
player.x -= 40
}else{
player.x += 40
}

})

function gameLoop(){

ctx.clearRect(0,0,canvas.width,canvas.height)

updateStars()

if(gameState === "playing"){

updateHearts()
checkCollision()

if(player.x < 0){
player.x = 0
}

if(player.x + player.width > canvas.width){
player.x = canvas.width - player.width
}

drawStars()
drawPlayer()
drawHearts()
drawScore()

}

if(gameState === "final"){

updateFinalHearts()
drawStars()
drawFinalHearts()
drawFinalMessage()

}

requestAnimationFrame(gameLoop)

}

gameLoop()