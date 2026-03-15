---
title: 'Compiled Behavior vs Runtime Simulation'
description: 'A bilingual note on PPO, critics, world models, and why runtime simulation in robotics usually lives in the physics engine, not the policy.'
publishDate: '2026-03-15'
tags:
  - RL
  - PPO
  - world-models
  - robotics
language: 'bilingual'
draft: false
comment: true
---

# Compiled Behavior vs. Runtime Simulation
# 被编译的行为，还是运行时的模拟结构

---

## 简介 / Introduction

PPO 的结构非常简洁：一个输出动作的策略网络，加上一个估计回报的价值网络，通过小步迭代逐渐改进策略。但越看越觉得不对劲——这种"局部平滑、小步更新"的机制，真的能承载复杂行为吗？它内部有没有某种模拟能力？Critic 算不算一种世界模型？训练系统里的"模拟"究竟由谁承担？

本文记录了围绕这几个问题的思考过程：从最初模糊的直觉出发，逐步澄清概念，最终得到一个更清晰的系统图景。核心结论是：PPO 策略是被压缩进参数里的反应能力，而"运行时模拟"在大多数机器人训练系统中，其实是由物理模拟器承担的——不是 RL 算法本身。

PPO's structure is deceptively simple: a policy network that outputs actions, a value network that estimates returns, and a clipping constraint that keeps updates small. But stare at it long enough and a question surfaces - can a mechanism this local really produce complex behavior? Does it have any internal simulation capacity? Is the Critic a kind of world model? And where does the "simulation" in a robot training system actually live?

This post traces the reasoning from an initial vague discomfort to a clearer picture. The core finding: a PPO policy is behavior compressed into parameters - reactive, fast, and modelless. The "runtime simulation" that supports it, in most robotics pipelines, comes from the physics simulator, not the RL algorithm itself.

---

## 一、PPO 的核心机制 / PPO's Core Mechanism

PPO 的训练逻辑可以概括为：用当前策略采样轨迹，计算 advantage，小步更新策略，同时约束新策略不要偏离旧策略太远。

这套机制有一个隐含假设：相似的状态，价值应该相似。正是依赖这种平滑性，经验才能从已访问的状态"传播"到附近状态，策略才能逐步改进。

The PPO training loop can be summarized as: sample trajectories with the current policy, compute advantages, update the policy with a small step, and constrain the new policy to stay close to the old one.

This mechanism rests on an implicit assumption: similar states should have similar values. It is precisely this smoothness that allows experience to "propagate" from visited states to nearby ones, enabling gradual policy improvement.

---

## 二、我以为缺失的是"因果结构" / My Initial Hypothesis: Missing Causal Structure

最初的直觉是：人类决策时会在脑中模拟不同选项、预测后果、再做选择。这看起来像某种"因果推演"。PPO 的前向传播里没有这种过程，所以我怀疑它缺乏因果结构。

但继续思考后意识到，这个说法其实不准确。我真正在意的，不是因果推断，而是一种更具体的能力：**迭代模拟**——预测不同动作序列的未来结果，在内部比较不同路径，再据此选择行动。

My initial intuition was: humans simulate options mentally, predict consequences, and then decide. This looks like causal reasoning. PPO's forward pass has none of this, so I suspected it lacked causal structure.

But on reflection, this framing was imprecise. What I actually cared about wasn't causal inference - it was something more concrete: **iterative simulation** - the ability to predict the outcomes of different action sequences, compare paths internally, and act on the result.

---

## 三、价值投影 vs 动力学投影 / Value Projection vs. Dynamics Projection

PPO 的 Critic 在学习 $V(s)$ 的过程中，也在吸收环境的某种规律。那它算不算一种世界模型？

这里有一个值得辨清的区分。Critic 是世界的一种投影，但它是**价值投影**：把大量未来可能的分支压缩成一个标量，只保留"好不好"的信息。而真正的世界模型是**动力学投影**：学习 $s, a \to s'$，保留未来状态如何变化的结构，能够展开多条可能的路径。

| | Critic（价值投影） | World Model（动力学投影） |
|---|---|---|
| 学习目标 | $V(s)$：这个状态值多少 | $T(s,a) \to s'$：执行动作后世界如何变化 |
| 信息结构 | 压缩成标量 | 保留状态转移结构 |
| 能做什么 | 评估当前位置的好坏 | 展开未来可能路径 |
| 类比 | 价值热力图 | 演化地图 |

**Critic 追求压缩；World Model 需要保留结构。** 前者无法用来"向前推演"。

The Critic learns $V(s)$ and in doing so absorbs regularities about the environment. Does that make it a world model?

There's a useful distinction here. The Critic is a projection of the world, but a **value projection**: it collapses many possible futures into a single scalar, retaining only "how good is this." A true world model is a **dynamics projection**: it learns $s, a \to s'$, preserving the structure of how states evolve, and can be unrolled to explore multiple possible futures.

| | Critic (Value Projection) | World Model (Dynamics Projection) |
|---|---|---|
| Target | $V(s)$: how much is this state worth | $T(s,a) \to s'$: how does the world change |
| Information | Compressed to scalar | State transition structure preserved |
| Capability | Evaluate current position | Unroll future trajectories |
| Analogy | Value heatmap | Evolution map |

**The Critic compresses; the World Model preserves structure.** The former cannot be used to "simulate forward."

---

## 四、模拟能力在哪里？ / Where Does Simulation Live?

如果 PPO 本身没有内部模拟结构，那机器人训练系统是怎么工作的？

答案是：**模拟能力被外包给了物理模拟器。**

```text
Policy (PPO)
      ↓  action
Physics Simulator (MuJoCo / Isaac Gym)
      ↓  next state + reward
Policy (PPO)
```

MuJoCo、Isaac Gym 这类模拟器负责计算动力学，告诉系统"执行这个动作后，世界变成什么样"。PPO 不需要自己学习这些——它只需要与模拟器不断交互，从采样到的轨迹中学习策略。

PPO 可以在机器人仿真任务中工作得很好，不是因为它自身有多复杂，而是因为它站在一个强大的动力学模型上面。

If PPO has no internal simulation structure, how do robot training systems work?

The answer: **simulation is outsourced to the physics simulator.**

```text
Policy (PPO)
      ↓  action
Physics Simulator (MuJoCo / Isaac Gym)
      ↓  next state + reward
Policy (PPO)
```

Simulators like MuJoCo and Isaac Gym handle the dynamics - they answer "given this action, what does the world become next." PPO doesn't need to learn this; it only needs to interact with the simulator and extract a policy from the resulting trajectories.

PPO works well on robot locomotion tasks not because of its own complexity, but because it stands on top of a powerful dynamics model.

---

## 五、结语 / Closing

回到最初的问题：强化学习中的智能，是被压缩进参数里的反应能力，还是依赖运行时仍然存在的模拟结构？

答案是：**两者都有，只是分布在系统的不同位置。** PPO 策略代表前者，物理模拟器代表后者。

真正有趣的延伸问题是：随着任务越来越复杂，我们是否需要把"运行时模拟"从外部模拟器内化到智能体自己的模型里？这正是 model-based RL 和 world model 研究的核心动机。

Back to the original question: is intelligence in reinforcement learning behavior compiled into parameters, or does it depend on simulation structures that persist at runtime?

The answer: **both - distributed across different parts of the system.** The PPO policy represents the former; the physics simulator represents the latter.

The more interesting follow-up question is: as tasks grow more complex, will we need to internalize "runtime simulation" from an external simulator into the agent's own model? That is precisely the motivation behind model-based RL and world model research.

---

*本文记录了一次从直觉追问到概念澄清的思考过程。如有不准确之处，欢迎指正。*

*This post traces a line of reasoning from an initial intuition to clearer concepts. Corrections and discussion are welcome.*
