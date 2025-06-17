from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

# Verifique se você tem um arquivo ia_interface.py, caso contrário, comente esta linha
from .ia_interface import gerar_planejamento_com_ia

# Importações dos seus modelos e serializers
from .models import Usuario, Rotina, Materia, Prova, Trabalho
from .serializers import (
    UsuarioSerializer, 
    PlanejamentoRequestSerializer, 
    RotinaSerializer,
    ProvasTrabalhosRequestSerializer
)

#
# CORREÇÃO: GARANTA QUE NÃO HÁ NENHUMA LINHA "from .views import ..." AQUI
#

@api_view(['POST'])
def gerar_planejamento(request):
    username = request.data.get('username')
    if not username:
        return Response({"erro": "Username é obrigatório para gerar planejamento."}, status=400)

    serializer = PlanejamentoRequestSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    dados = serializer.validated_data
    planejamento = gerar_planejamento_com_ia(dados)

    if "erro" in planejamento:
        return Response(planejamento, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    try:
        usuario = Usuario.objects.get(nome=username)
        Rotina.objects.update_or_create(
            usuario=usuario,
            defaults={
                'horarios': planejamento.get('horarios'), 
                'observacoes': planejamento.get('observacoes', ''),
                'hobbies': planejamento.get('hobbies', [])
            }
        )
    except Usuario.DoesNotExist:
        return Response({"erro": "Usuário não encontrado para salvar a rotina."}, status=404)

    return Response(planejamento, status=status.HTTP_200_OK)


class ValidarUsuarioView(APIView):
    def post(self, request):
        username = request.data.get('username')
        if not username:
            return Response({'message': 'Nome de usuário obrigatório.'}, status=400)
        try:
            usuario = Usuario.objects.get(nome=username)
            serializer = UsuarioSerializer(usuario)
            return Response(serializer.data, status=200)
        except Usuario.DoesNotExist:
            return Response({'message': 'Usuário não encontrado'}, status=404)


class BuscarRotinaView(APIView):
    def post(self, request):
        username = request.data.get('username')
        if not username:
            return Response({"erro": "Username não foi fornecido."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            usuario = Usuario.objects.get(nome=username)
            rotina = Rotina.objects.get(usuario=usuario)
            serializer = RotinaSerializer(rotina)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except (Usuario.DoesNotExist, Rotina.DoesNotExist):
            return Response({"erro": f"Nenhuma rotina encontrada para o usuário '{username}'."}, status=status.HTTP_404_NOT_FOUND)


class CriarUsuarioView(APIView):
    def post(self, request):
        serializer = UsuarioSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'message': 'Usuário criado com sucesso'}, status=201)


class SincronizarProvasTrabalhosView(APIView):
    def post(self, request):
        # A sua lógica existente para sincronizar provas e trabalhos continua aqui
        # ... (código omitido para brevidade)
        return Response({"status": "sincronizado com sucesso"}, status=200)

