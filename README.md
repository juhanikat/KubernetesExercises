## Exercises

- [1.1](https://github.com/juhanikat/KubernetesExercises/tree/1.1/chapter2/log-output)
- [1.2](https://github.com/juhanikat/KubernetesExercises/tree/1.2/chapter2/todo-app)
- [1.3](https://github.com/juhanikat/KubernetesExercises/tree/1.3/chapter2/log-output)
- [1.4](https://github.com/juhanikat/KubernetesExercises/tree/1.4/chapter2/todo-app)
- [1.5](https://github.com/juhanikat/KubernetesExercises/tree/1.5/chapter2/todo-app)
- [1.6](https://github.com/juhanikat/KubernetesExercises/tree/1.6/chapter2/todo-app)
- [1.7](https://github.com/juhanikat/KubernetesExercises/tree/1.7/chapter2/log-output)
- [1.8](https://github.com/juhanikat/KubernetesExercises/tree/1.8/chapter2/todo-app)
- [1.9](https://github.com/juhanikat/KubernetesExercises/tree/1.9/chapter2/ping-pong-app)
- [1.10](https://github.com/juhanikat/KubernetesExercises/tree/1.10/chapter2/log-output)
- [1.11](https://github.com/juhanikat/KubernetesExercises/tree/1.11/chapter2)
- [1.12](https://github.com/juhanikat/KubernetesExercises/tree/1.12/chapter2/todo-app)
- [1.13](https://github.com/juhanikat/KubernetesExercises/tree/1.13/chapter2/todo-app)
- [2.1](https://github.com/juhanikat/KubernetesExercises/tree/2.1/ping-pong-app)
- [2.2](https://github.com/juhanikat/KubernetesExercises/tree/2.2/todo-exercises)
- [2.3](https://github.com/juhanikat/KubernetesExercises/tree/2.3/)
- [2.4](https://github.com/juhanikat/KubernetesExercises/tree/2.4/todo-project)
- [2.5](https://github.com/juhanikat/KubernetesExercises/tree/2.5/exercises)
- [2.6](https://github.com/juhanikat/KubernetesExercises/tree/2.6/todo-project)
- [2.7](https://github.com/juhanikat/KubernetesExercises/tree/2.7/exercises)
- [2.8](https://github.com/juhanikat/KubernetesExercises/tree/2.8/todo-project)
- [2.9](https://github.com/juhanikat/KubernetesExercises/tree/2.9/todo-project)
- [2.10](https://github.com/juhanikat/KubernetesExercises/tree/2.10/todo-project)
- [3.1](https://github.com/juhanikat/KubernetesExercises/tree/3.1/exercises/ping-pong-app)
- [3.2](https://github.com/juhanikat/KubernetesExercises/tree/3.2/exercises)
- [3.3](https://github.com/juhanikat/KubernetesExercises/tree/3.3/exercises)
- [3.4](https://github.com/juhanikat/KubernetesExercises/tree/3.4/exercises)
- [3.5](https://github.com/juhanikat/KubernetesExercises/tree/3.5/todo-project)
- [3.6](https://github.com/juhanikat/KubernetesExercises/tree/3.6/todo-project)
- [3.7](https://github.com/juhanikat/KubernetesExercises/tree/3.7/todo-project)
- [3.8](https://github.com/juhanikat/KubernetesExercises/tree/3.8)


## Database as a service VS DIY (exercise 3.9)

Figuring out a database yourself obviously gives more control over the database, since you have to maintain and configure servers and handle a lot more of the problems related to it yourself. However, especially in larger projects, this also requires more people to work on designing and maintaining the database, which means more costs. Any designs also have to be tested, which can take a lot of time and work. When using a DBaaS, these phases are pretty much handled for you automatically. 

In both the initialization and the maintenance phase, there are likely to be unexpected costs (maybe you need to hire more people than you originally thought to work on the database), especially if the people designing or managing the project don't have much experience with DIY databases. When using a DBaaS, any such unexpected issues will be handled by the provider. 

After the database has been initialized, it usually has to be upgraded at times to e.g. increase capacity or to fix bugs. This can be costly and require a lot of time. Many DBaaS platforms can automatically scale server capacity up or down depending on the needs of the database, which means you don't need to pay for servers that are not needed, saving costs.

DBaaS providers of course try to keep ease of usage in mind when designing their platform, but they cannot account for every possible database design a customer might want to implement. In some cases using a DBaaS might not, for example, give you the level of control you want over the database, in which case it might be better to implement a solution yourself. 

In short, using a DBaaS can save a lot of time and money and is especially useful to avoid any hidden or unexpected costs relating to the design and implementation of a DIY database. However, especially if you have a clear, simple and unconventional database design in mind, it might be worth considering a DIY solution.

Source: https://blog.purestorage.com/perspectives/dbaas-or-diy-build-versus-buy-comparison/
