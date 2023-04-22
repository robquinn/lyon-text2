const isProd: EnvUtils.IsProd = () => process.env.NODE_ENV === 'production';

export default isProd;
