Los diagramas referentes a este proyecto, las podrá encontrar en los siguientes links:

-Diagrama de la arquitectura:
https://drive.google.com/file/d/10bCKcmP5srES5g1z0Rh4pIjCkqHOw2TV/view?usp=sharing

-Diagrama de casos de uso:
https://drive.google.com/file/d/10bCKcmP5srES5g1z0Rh4pIjCkqHOw2TV/view?usp=sharing

-Diagrama de componentes de software:
https://drive.google.com/file/d/1a87T4oDlZU_gJxL4DYRrm6gfRnln91J2/view?usp=sharing

En el diagrama 3 se pueden observar diferentes flechas con algunos números, cada flecha indica una dependencia entre dos componentes:

1. Flutter usará el SDK de Firebase para hacer la autenticación del sistema y además de ayudarnos a hacer más seguro el proceso, nos ayudará a enfocarnos en nuestro código específico del proyecto.
2. Flutter se conectará con el backend hecho en NodeJS por medio del protocolo HTTP para obtener y llevar información al mismo.
3. NodeJS usará el SDK de Firebase para hacer la autorización desde el back y de este modo obtener la información de manera segura y ágil.
4. Se usará una base de datos MongoDB para guardar los datos resultantes de nuestros sensores, además de otros datos que necesitaremos, como la clave dinámica.
5. Habrá un broker Mosquitto en donde se subscribirán y se publicarán los mensajes desde el back y desde los diferentes sensores, a través del protocolo MQTT.
6. En los diferentes ESP32 habrán desarrollos hechos con C++, los cuales tendrán el uso que se le dará a los datos recolectados por los sensores, su actuar frente a estos y el comportamiento que tendrán los actuadores cuando reciban ciertos mensajes del broker.
