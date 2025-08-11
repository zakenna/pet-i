'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Save, ArrowLeft, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';

interface PetFormData {
  name: string;
  type: string;
  breed: string;
  gender: string;
  birthDate: string;
  weight: string;
  color: string;
  microchipId: string;
  profileImage: string;
}

const PetRegisterPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<PetFormData>({
    name: '',
    type: '',
    breed: '',
    gender: '',
    birthDate: '',
    weight: '',
    color: '',
    microchipId: '',
    profileImage: '',
  });

  const petTypes = [
    { value: 'dog', label: '🐕 강아지' },
    { value: 'cat', label: '🐱 고양이' },
    { value: 'bird', label: '🐦 새' },
    { value: 'rabbit', label: '🐰 토끼' },
    { value: 'hamster', label: '🐹 햄스터' },
    { value: 'fish', label: '🐠 물고기' },
    { value: 'reptile', label: '🦎 파충류' },
    { value: 'other', label: '🐾 기타' },
  ];

  const genderOptions = [
    { value: 'male', label: '♂️ 수컷' },
    { value: 'female', label: '♀️ 암컷' },
    { value: 'unknown', label: '❓ 모름' },
  ];

  const handleInputChange = (field: keyof PetFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.type) {
      alert('이름과 동물 종류는 필수입니다.');
      return;
    }

    setIsLoading(true);

    try {
      const submitData = {
        ...formData,
        weight: formData.weight ? parseFloat(formData.weight) : null,
        birthDate: formData.birthDate || null,
      };

      console.log('전송할 데이터:', submitData); // 디버깅용

      const response = await fetch('/api/pets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();
      console.log('API 응답:', result); // 디버깅용

      if (result.success) {
        alert(`🎉 ${formData.name}이(가) 성공적으로 등록되었습니다!`);
        
        // 등록 완료 후 홈으로 이동
        router.push('/');
      } else {
        alert(`❌ ${result.error || '등록에 실패했습니다.'}`);
      }
    } catch (error) {
      console.error('등록 실패:', error);
      alert('❌ 등록 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <SignedOut>
        {/* 로그인하지 않은 경우 */}
        <div className="flex items-center justify-center min-h-screen p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-orange-800">
                <Heart className="mx-auto mb-2 h-8 w-8" />
                Pet-I™에 오신 것을 환영합니다
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-orange-600">
                반려동물을 등록하려면 먼저 로그인해주세요.
              </p>
              <SignInButton mode="modal">
                <Button className="w-full bg-orange-500 hover:bg-orange-600">
                  로그인하기
                </Button>
              </SignInButton>
              <Link href="/">
                <Button variant="outline" className="w-full border-orange-200">
                  홈으로 돌아가기
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </SignedOut>

      <SignedIn>
        {/* 로그인한 경우 - 등록 폼 */}
        <div className="container mx-auto p-4 lg:p-8">
          {/* 헤더 */}
          <div className="mb-6">
            <Link href="/">
              <Button variant="outline" className="mb-4 border-orange-200">
                <ArrowLeft className="mr-2 h-4 w-4" />
                홈으로 돌아가기
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-orange-800 text-center">
              새로운 가족 등록하기
            </h1>
            <p className="text-orange-600 text-center mt-2">
              소중한 반려동물의 정보를 입력해주세요
            </p>
          </div>

          {/* 등록 폼 */}
          <Card className="w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-sm border-orange-100">
            <CardHeader>
              <CardTitle className="flex items-center text-orange-800 text-xl">
                <PlusCircle className="mr-2 h-6 w-6" />
                반려동물 정보 입력
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* 기본 정보 섹션 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-orange-700 border-b border-orange-200 pb-2">
                    📋 기본 정보
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-orange-700 font-medium">
                        이름 <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="예: 멍멍이, 야옹이"
                        className="border-orange-200 focus:border-orange-400"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="type" className="text-orange-700 font-medium">
                        종류 <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value) => handleInputChange('type', value)}
                      >
                        <SelectTrigger className="border-orange-200 focus:border-orange-400">
                          <SelectValue placeholder="동물 종류를 선택하세요" />
                        </SelectTrigger>
                        <SelectContent>
                          {petTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="breed" className="text-orange-700 font-medium">
                        품종
                      </Label>
                      <Input
                        id="breed"
                        value={formData.breed}
                        onChange={(e) => handleInputChange('breed', e.target.value)}
                        placeholder="예: 골든 리트리버, 페르시안"
                        className="border-orange-200 focus:border-orange-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender" className="text-orange-700 font-medium">
                        성별
                      </Label>
                      <Select
                        value={formData.gender}
                        onValueChange={(value) => handleInputChange('gender', value)}
                      >
                        <SelectTrigger className="border-orange-200 focus:border-orange-400">
                          <SelectValue placeholder="성별을 선택하세요" />
                        </SelectTrigger>
                        <SelectContent>
                          {genderOptions.map((gender) => (
                            <SelectItem key={gender.value} value={gender.value}>
                              {gender.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* 상세 정보 섹션 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-orange-700 border-b border-orange-200 pb-2">
                    📊 상세 정보
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="birthDate" className="text-orange-700 font-medium">
                        생년월일
                      </Label>
                      <Input
                        id="birthDate"
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) => handleInputChange('birthDate', e.target.value)}
                        className="border-orange-200 focus:border-orange-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="weight" className="text-orange-700 font-medium">
                        체중 (kg)
                      </Label>
                      <Input
                        id="weight"
                        type="number"
                        step="0.1"
                        min="0"
                        value={formData.weight}
                        onChange={(e) => handleInputChange('weight', e.target.value)}
                        placeholder="예: 5.2"
                        className="border-orange-200 focus:border-orange-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="color" className="text-orange-700 font-medium">
                        색상/무늬
                      </Label>
                      <Input
                        id="color"
                        value={formData.color}
                        onChange={(e) => handleInputChange('color', e.target.value)}
                        placeholder="예: 갈색, 흰색 바탕에 갈색 점무늬"
                        className="border-orange-200 focus:border-orange-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="microchipId" className="text-orange-700 font-medium">
                        마이크로칩 ID
                      </Label>
                      <Input
                        id="microchipId"
                        value={formData.microchipId}
                        onChange={(e) => handleInputChange('microchipId', e.target.value)}
                        placeholder="마이크로칩 번호 (선택사항)"
                        className="border-orange-200 focus:border-orange-400"
                      />
                    </div>
                  </div>
                </div>

                {/* 프로필 이미지 섹션 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-orange-700 border-b border-orange-200 pb-2">
                    📸 프로필 사진
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="profileImage" className="text-orange-700 font-medium">
                      프로필 이미지 URL (선택사항)
                    </Label>
                    <Input
                      id="profileImage"
                      value={formData.profileImage}
                      onChange={(e) => handleInputChange('profileImage', e.target.value)}
                      placeholder="https://example.com/pet-photo.jpg"
                      className="border-orange-200 focus:border-orange-400"
                    />
                  </div>
                  
                  {/* 이미지 미리보기 */}
                  {formData.profileImage && (
                    <div className="flex justify-center">
                      <div className="relative">
                        <img
                          src={formData.profileImage}
                          alt="프로필 미리보기"
                          className="w-32 h-32 rounded-full object-cover border-4 border-orange-200 shadow-lg"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        <div className="absolute -bottom-2 -right-2 bg-orange-500 text-white rounded-full p-1">
                          ✓
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 제출 버튼 */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-orange-200">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-lg py-3"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        등록 중...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-5 w-5" />
                        우리 가족으로 등록하기
                      </>
                    )}
                  </Button>
                  
                  <Link href="/" className="flex-1">
                    <Button
                      type="button"
                      variant="outline"
                      disabled={isLoading}
                      className="w-full border-orange-200 text-lg py-3"
                    >
                      취소
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </SignedIn>
    </div>
  );
};

export default PetRegisterPage;