from django.db import models

# Modelo para os usuários da aplicação
class Usuario(models.Model):
    id = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.nome

# NOVO MODELO: Para salvar a rotina de cada usuário
class Rotina(models.Model):
    # Relaciona a rotina a um único usuário. Se o usuário for deletado, a rotina também será.
    # Usamos OneToOneField para garantir que cada usuário tenha apenas uma rotina principal.
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, primary_key=True)
    
    # JSONField é perfeito para guardar a estrutura flexível dos seus horários.
    horarios = models.JSONField()
    
    # hobbies pode ser usado no futuro, guardado como uma lista JSON.
    hobbies = models.JSONField(default=list) 
    
    # Campo de texto para as observações.
    observacoes = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return f"Rotina de {self.usuario.nome}"

# Seus outros modelos para matérias, provas e trabalhos
class Materia(models.Model):
    nome = models.CharField(max_length=255)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)

    def __str__(self):
        return self.nome

class Prova(models.Model):
    materia = models.ForeignKey(Materia, on_delete=models.CASCADE)
    data = models.DateField()
    descricao = models.TextField()

class Trabalho(models.Model):
    materia = models.ForeignKey(Materia, on_delete=models.CASCADE)
    data_entrega = models.DateField()
    descricao = models.TextField()
