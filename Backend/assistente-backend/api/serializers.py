from rest_framework import serializers
# Adicionamos a importação do novo modelo 'Rotina'
from .models import Usuario, Rotina

# Este serializer está bom como está.
class HorarioMateriaSerializer(serializers.Serializer):
    materia = serializers.CharField()
    horario = serializers.RegexField(
        regex=r'^\d{2}:\d{2}-\d{2}:\d{2}$',
        error_messages={"invalid": "Formato deve ser HH:MM-HH:MM"}
    )

# Este serializer está bom como está.
class DiasDaSemanaSerializer(serializers.Serializer):
    Segunda = HorarioMateriaSerializer(many=True, required=False)
    Terça = HorarioMateriaSerializer(many=True, required=False)
    Quarta = HorarioMateriaSerializer(many=True, required=False)
    Quinta = HorarioMateriaSerializer(many=True, required=False)
    Sexta = HorarioMateriaSerializer(many=True, required=False)
    Sábado = HorarioMateriaSerializer(many=True, required=False)
    Domingo = HorarioMateriaSerializer(many=True, required=False)

# CORREÇÃO FINAL: Adicionado o campo 'username'
class PlanejamentoRequestSerializer(serializers.Serializer):
    username = serializers.CharField() # Adicionado para receber o nome do usuário
    horarios = DiasDaSemanaSerializer()
    hobbies = serializers.ListField(child=serializers.CharField(), required=False, allow_empty=True)
    observacoes = serializers.CharField(allow_blank=True, required=False)

# Ajustado para retornar o 'id' e o 'nome'.
class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'nome']

# Novo serializer para o modelo Rotina.
class RotinaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rotina
        fields = ['usuario', 'horarios', 'hobbies', 'observacoes']

# Seus outros serializers continuam aqui.
class ProvaSerializer(serializers.Serializer):
    materia = serializers.CharField()
    data = serializers.DateField()
    descricao = serializers.CharField()

class TrabalhoSerializer(serializers.Serializer):
    materia = serializers.CharField()
    data_entrega = serializers.DateField()
    descricao = serializers.CharField()

class ProvasTrabalhosRequestSerializer(serializers.Serializer):
    usuario = serializers.CharField()
    provas = ProvaSerializer(many=True)
    trabalhos = TrabalhoSerializer(many=True)
