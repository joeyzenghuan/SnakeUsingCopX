import random
import pygame


# 初始化Pygame
pygame.init()

# 游戏窗口大小
WINDOW_WIDTH = 800
WINDOW_HEIGHT = 600

# 颜色定义
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)

# 创建游戏窗口
window = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
pygame.display.set_caption('Snake Game')

# 定义贪吃蛇类
class Snake:
    def __init__(self):
        self.body = [[WINDOW_WIDTH // 2, WINDOW_HEIGHT // 2]]
        self.direction = 'right'

    def move(self):
        x, y = self.body[0]
        if self.direction == 'up':
            y -= 10
        elif self.direction == 'down':
            y += 10
        elif self.direction == 'left':
            x -= 10
        elif self.direction == 'right':
            x += 10
        self.body.insert(0, [x, y])
        self.body.pop()

    def draw(self):
        for x, y in self.body:
            pygame.draw.rect(window, GREEN, (x, y, 10, 10))

    def grow(self):
        x, y = self.body[0]
        if self.direction == 'up':
            y -= 10
        elif self.direction == 'down':
            y += 10
        elif self.direction == 'left':
            x -= 10
        elif self.direction == 'right':
            x += 10
        self.body.insert(0, [x, y])

    def check_collision(self):
        x, y = self.body[0]
        if x < 0 or x > WINDOW_WIDTH or y < 0 or y > WINDOW_HEIGHT:
            return True
        for i in range(1, len(self.body)):
            if self.body[i] == self.body[0]:
                return True
        return False

# 定义食物类
class Food:
    def __init__(self):
        self.x = random.randint(0, WINDOW_WIDTH - 10)
        self.y = random.randint(0, WINDOW_HEIGHT - 10)

    def draw(self):
        pygame.draw.rect(window, RED, (self.x, self.y, 10, 10))

# 创建贪吃蛇和食物对象
snake = Snake()
food = Food()

# 游戏循环
running = True
while running:
    # 处理事件
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_UP and snake.direction != 'down':
                snake.direction = 'up'
            elif event.key == pygame.K_DOWN and snake.direction != 'up':
                snake.direction = 'down'
            elif event.key == pygame.K_LEFT and snake.direction != 'right':
                snake.direction = 'left'
            elif event.key == pygame.K_RIGHT and snake.direction != 'left':
                snake.direction = 'right'

    # 移动贪吃蛇
    snake.move()

    # 检查是否吃到食物
    if snake.body[0] == [food.x, food.y]:
        snake.grow()
        food = Food()

    # 检查是否碰到边界或自身
    if snake.check_collision():
        running = False

    # 绘制游戏界面
    window.fill(BLACK)
    snake.draw()
    food.draw()
    pygame.display.update()

# 退出Pygame
pygame.quit()
